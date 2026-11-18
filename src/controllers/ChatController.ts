import i18next from "i18next";
import { ChatService } from "@api/services/chat.service";
import { ApiError } from "@api/client";
import type { ChatMessage } from "@common/types";
import { MessageRole, MessageStatus, ChatConfig } from "@common/constants";
import {
  storageController,
  type StoredConversation,
} from "./StorageController";
import { parseStreamContent } from "@features/chat/StreamRenderer/streamParser";

type ChatObserver = (messages: ChatMessage[], isStreaming: boolean) => void;

class ChatController {
  private currentConversationId: string = "";
  private messages: ChatMessage[] = [];
  private isStreaming: boolean = false;
  private currentAbortController: AbortController | null = null;
  private observers: Set<ChatObserver> = new Set();

  constructor() {
    this.currentConversationId = this.generateId();
    this.initFromStorage();
  }

  private generateId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private async initFromStorage(): Promise<void> {
    try {
      await storageController.pruneExpiredConversations();
      const recent = await storageController.getRecentConversations(1);
      if (recent.length > 0 && recent[0].messages.length > 0) {
        this.currentConversationId = recent[0].id;
        this.messages = recent[0].messages;
        this.notify();
      }
    } catch {
      // Clean fallback if IndexedDB fails
    }
  }

  getConversationId(): string {
    return this.currentConversationId;
  }

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  getIsStreaming(): boolean {
    return this.isStreaming;
  }

  async loadConversation(conversationId: string): Promise<boolean> {
    const stored = await storageController.getConversation(conversationId);
    if (stored) {
      this.currentConversationId = stored.id;
      this.messages = stored.messages;
      this.notify();
      return true;
    }
    return false;
  }

  newChat(): string {
    if (this.isStreaming) {
      this.stopStreaming();
    }
    // Retain previous conversation in IndexedDB (do not delete) and start a new thread
    this.currentConversationId = this.generateId();
    this.messages = [];
    this.notify();
    return this.currentConversationId;
  }

  stopStreaming(): void {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
    this.isStreaming = false;

    // Finalize latest assistant message if stopped early
    const lastMsg = this.messages[this.messages.length - 1];
    if (lastMsg && lastMsg.role === MessageRole.ASSISTANT) {
      lastMsg.status = MessageStatus.COMPLETE;
      const parsed = parseStreamContent(lastMsg.content, false);
      if (parsed.suggestions.length > 0) {
        lastMsg.followups = parsed.suggestions;
      }
    }

    this.persistConversation();
    this.notify();
  }

  async sendMessage(content: string): Promise<void> {
    if (!content.trim() || this.isStreaming) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      role: MessageRole.USER,
      content: content.trim(),
      timestamp: Date.now(),
      status: MessageStatus.COMPLETE,
    };

    this.messages.push(userMessage);

    const assistantMessageId = `msg_${Date.now()}_a`;
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: MessageRole.ASSISTANT,
      content: "",
      timestamp: Date.now(),
      status: MessageStatus.STREAMING,
    };

    this.messages.push(assistantMessage);
    this.isStreaming = true;
    this.notify();

    this.currentAbortController = new AbortController();

    try {
      const historyToSend = this.messages
        .slice(0, -1) // Exclude current empty assistant message
        .slice(-ChatConfig.maxHistoryTurns)
        .map((m) => ({ role: m.role, content: m.content }));

      await ChatService.streamChat(
        {
          messages: historyToSend,
          conversationId: this.currentConversationId,
        },
        (chunk) => {
          assistantMessage.content += chunk;
          // Extract suggestions mid-stream as they arrive
          const parsed = parseStreamContent(assistantMessage.content, true);
          if (parsed.suggestions.length > 0) {
            assistantMessage.followups = parsed.suggestions;
          }
          this.notify();
        },
        this.currentAbortController.signal,
      );

      assistantMessage.status = MessageStatus.COMPLETE;
      // Final parse after stream completion
      const parsed = parseStreamContent(assistantMessage.content, false);
      if (parsed.suggestions.length > 0) {
        assistantMessage.followups = parsed.suggestions;
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // Stream deliberately aborted by user via "Stop generating"
        assistantMessage.status = MessageStatus.COMPLETE;
      } else if (err instanceof ApiError && err.status === 429) {
        // Rate limit reached (20 requests / 10 minutes)
        assistantMessage.status = MessageStatus.ERROR;
        assistantMessage.content = i18next.t("chat.errors.rateLimit");
        assistantMessage.followups = [
          i18next.t("chat.fallbackFollowups.techStack"),
          i18next.t("chat.fallbackFollowups.projects"),
          i18next.t("chat.fallbackFollowups.experience"),
        ];
      } else {
        // Network or server error -> graceful fallback response
        console.warn(
          "Live stream encountered error, applying knowledge base response:",
          err,
        );
        assistantMessage.status = MessageStatus.COMPLETE;
        assistantMessage.content =
          assistantMessage.content || this.getFallbackResponse(content);
        const parsed = parseStreamContent(assistantMessage.content, false);
        if (parsed.suggestions.length > 0) {
          assistantMessage.followups = parsed.suggestions;
        }
      }
    } finally {
      this.isStreaming = false;
      this.currentAbortController = null;
      this.persistConversation();
      this.notify();
    }
  }

  private getFallbackResponse(query: string): string {
    const lower = query.toLowerCase();
    if (
      lower.includes("stack") ||
      lower.includes("skill") ||
      lower.includes("tech")
    ) {
      return i18next.t("chat.fallback.techStack");
    }
    if (lower.includes("project") || lower.includes("work")) {
      return i18next.t("chat.fallback.projects");
    }
    if (
      lower.includes("experience") ||
      lower.includes("career") ||
      lower.includes("history")
    ) {
      return i18next.t("chat.fallback.experience");
    }
    return i18next.t("chat.fallback.generic");
  }

  private persistConversation(): void {
    if (this.messages.length === 0) return;

    const stored: StoredConversation = {
      id: this.currentConversationId,
      messages: this.messages,
      createdAt: this.messages[0]?.timestamp || Date.now(),
      updatedAt: Date.now(),
    };

    storageController.saveConversation(stored);
  }

  subscribe(observer: ChatObserver): () => void {
    this.observers.add(observer);
    observer(this.messages, this.isStreaming);
    return () => this.observers.delete(observer);
  }

  private notify(): void {
    this.observers.forEach((obs) => obs(this.messages, this.isStreaming));
  }
}

export const chatController = new ChatController();
