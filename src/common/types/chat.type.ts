export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatStreamRequest {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
  conversationId: string;
}

export type StreamChunkHandler = (chunk: string) => void;

