import { ApiConfig, Endpoints } from "@common/constants";
import {
  HttpMethod,
  HttpHeader,
  ContentType,
  SseToken,
} from "@common/constants";
import type { ChatStreamRequest, StreamChunkHandler } from "@common/types";
import { ApiError } from "../client";

export const ChatService = {
  streamChat: async (
    request: ChatStreamRequest,
    onChunk: StreamChunkHandler,
    signal?: AbortSignal,
  ): Promise<string> => {
    const url = `${ApiConfig.baseUrl}${Endpoints.CHAT_STREAM}`;

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
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        `Chat stream failed with status ${response.status}`,
        response.status,
        errorData,
      );
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported on response");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";
    let lineBuffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const rawText = decoder.decode(value, { stream: true });
        lineBuffer += rawText;

        const lines = lineBuffer.split("\n");
        // Keep the last partial line in the buffer
        lineBuffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":")) {
            // Keep-alive or comment line
            continue;
          }

          if (trimmed.startsWith(SseToken.DATA_PREFIX)) {
            const dataContent = trimmed
              .slice(SseToken.DATA_PREFIX.length)
              .trim();

            if (dataContent === SseToken.DONE) {
              return accumulatedText;
            }

            try {
              const parsed = JSON.parse(dataContent);
              if (parsed && typeof parsed.chunk === "string") {
                accumulatedText += parsed.chunk;
                onChunk(parsed.chunk);
              } else if (parsed && parsed.error) {
                throw new ApiError(String(parsed.error), 500, parsed);
              } else {
                accumulatedText += dataContent;
                onChunk(dataContent);
              }
            } catch (jsonErr) {
              if (jsonErr instanceof ApiError) throw jsonErr;
              // Raw non-JSON data payload
              accumulatedText += dataContent;
              onChunk(dataContent);
            }
          } else {
            // Non-SSE formatted raw stream line fallback
            accumulatedText += line + "\n";
            onChunk(line + "\n");
          }
        }
      }

      // Flush any remaining characters in buffer
      if (lineBuffer.trim().startsWith(SseToken.DATA_PREFIX)) {
        const dataContent = lineBuffer
          .trim()
          .slice(SseToken.DATA_PREFIX.length)
          .trim();
        if (dataContent !== SseToken.DONE) {
          try {
            const parsed = JSON.parse(dataContent);
            if (parsed && typeof parsed.chunk === "string") {
              accumulatedText += parsed.chunk;
              onChunk(parsed.chunk);
            }
          } catch {
            accumulatedText += dataContent;
            onChunk(dataContent);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return accumulatedText;
  },
};
