import { AppConfig } from "@config/constants";
import { HttpMethod, HttpHeader, ContentType } from "@common/constants";
import type { ChatStreamRequest, StreamChunkHandler } from "@common/types";

export const chatService = {
  streamChat: async (
    request: ChatStreamRequest,
    onChunk: StreamChunkHandler,
    signal?: AbortSignal
  ): Promise<string> => {
    const url = `${AppConfig.api.baseUrl}${AppConfig.api.endpoints.chatStream}`;

    const response = await fetch(url, {
      method: HttpMethod.POST,
      headers: {
        [HttpHeader.CONTENT_TYPE]: ContentType.JSON,
        [HttpHeader.ACCEPT]: ContentType.EVENT_STREAM,
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
