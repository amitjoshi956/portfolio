import { AppConfig } from "@config/constants";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface ChatStreamRequest {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
  conversationId: string;
}

export type StreamChunkHandler = (chunk: string) => void;

export const chatService = {
  streamChat: async (
    request: ChatStreamRequest,
    onChunk: StreamChunkHandler,
    signal?: AbortSignal
  ): Promise<string> => {
    const url = `${AppConfig.api.baseUrl}${AppConfig.api.endpoints.chatStream}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(request),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Chat stream failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported on response");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const textChunk = decoder.decode(value, { stream: true });
      accumulated += textChunk;
      onChunk(textChunk);
    }

    return accumulated;
  },
};
