import type { MessageRole, MessageStatus } from "../constants/chat.const";

export type MessageRoleType = (typeof MessageRole)[keyof typeof MessageRole];
export type MessageStatusType =
  (typeof MessageStatus)[keyof typeof MessageStatus];

export type WidgetToken = {
  type: string;
  data: unknown;
};

export type ChatMessage = {
  id: string;
  role: MessageRoleType;
  content: string;
  timestamp: number;
  followups?: string[];
  widgets?: WidgetToken[];
  status?: MessageStatusType;
  error?: string;
};

export type ChatStreamRequest = {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
  conversationId: string;
};

export type StreamChunkHandler = (chunk: string) => void;

/* Contact types */
export type ContactPayload = {
  email: string;
  subject: string;
  message: string;
};
export type ContactResponse = {
  success: boolean;
  message?: string;
};
