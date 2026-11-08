import { chatService } from "@api/services/chat.service";
import type { ChatMessage } from "@common/types";
import { storageController, type StoredConversation } from "./StorageController";
import { AppConfig } from "@config/constants";

type ChatObserver = (messages: ChatMessage[], isStreaming: boolean) => void;

class ChatController {
  private currentConversationId: string = "";
  private messages: ChatMessage[] = [];
  private isStreaming: boolean = false;
  private currentAbortController: AbortController | null = null;
  private observers: Set<ChatObserver> = new Set();

  constructor() {
    this.currentConversationId = this.generateId();
  }

  private generateId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
    this.notify();
  }

  async sendMessage(content: string): Promise<void> {
    if (!content.trim() || this.isStreaming) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    this.messages.push(userMessage);

    const assistantMessageId = `msg_${Date.now()}_a`;
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    };

    this.messages.push(assistantMessage);
    this.isStreaming = true;
    this.notify();

    this.currentAbortController = new AbortController();

    try {
      const historyToSend = this.messages
        .slice(0, -1) // Exclude current empty assistant message
        .slice(-AppConfig.chat.maxHistoryTurns)
        .map((m) => ({ role: m.role, content: m.content }));

      await chatService.streamChat(
        {
          messages: historyToSend,
          conversationId: this.currentConversationId,
        },
        (chunk) => {
          assistantMessage.content += chunk;
          this.notify();
        },
        this.currentAbortController.signal
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // Stream aborted by user
      } else {
        assistantMessage.content =
          assistantMessage.content ||
          "I apologize, but I encountered an issue connecting to the portfolio service. Please try again shortly.";
      }
    } finally {
      this.isStreaming = false;
      this.currentAbortController = null;
      this.persistConversation();
      this.notify();
    }
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

