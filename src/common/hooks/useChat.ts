import { useState, useEffect, useCallback } from "react";
import { chatController } from "@controllers/ChatController";
import type { ChatMessage } from "@common/types";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatController.getMessages());
  const [isStreaming, setIsStreaming] = useState<boolean>(chatController.getIsStreaming());

  useEffect(() => {
    const unsubscribe = chatController.subscribe((newMessages, streamingState) => {
      setMessages([...newMessages]);
      setIsStreaming(streamingState);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = useCallback((content: string) => {
    return chatController.sendMessage(content);
  }, []);

  const stopStreaming = useCallback(() => {
    chatController.stopStreaming();
  }, []);

  const newChat = useCallback(() => {
    return chatController.newChat();
  }, []);

  return {
    conversationId: chatController.getConversationId(),
    messages,
    isStreaming,
    sendMessage,
    stopStreaming,
    newChat,
  };
};

export default useChat;
