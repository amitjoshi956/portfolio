import { useState, useCallback, type FC } from "react";
import { useChat } from "@common/hooks";
import MessageList from "../MessageList";
import ChatInput from "../ChatInput";

import "./ChatContainer.scss";

const SampleFollowups: Record<string, string[]> = {
  default: [
    "Tell me about AutoPosts AI",
    "What's his experience at LTIMindtree?",
    "How can I contact Amit?",
  ],
  stack: ["What backend tools does he use?", "Tell me about his React expertise"],
  projects: ["Show me AutoPosts AI details", "Tell me about RS Yatra"],
  experience: ["What was his role at Robert Bosch?", "What are his key achievements?"],
};

const ChatContainer: FC = () => {
  const { messages, isStreaming, sendMessage, stopStreaming } = useChat();
  const [followupSuggestions, setFollowupSuggestions] = useState<string[]>(
    SampleFollowups.default
  );

  const handleSend = useCallback(
    async (text: string) => {
      // Determine contextual follow-ups based on query
      const lower = text.toLowerCase();
      if (lower.includes("stack") || lower.includes("skill")) {
        setFollowupSuggestions(SampleFollowups.stack);
      } else if (lower.includes("project")) {
        setFollowupSuggestions(SampleFollowups.projects);
      } else if (lower.includes("experience") || lower.includes("work")) {
        setFollowupSuggestions(SampleFollowups.experience);
      } else {
        setFollowupSuggestions(SampleFollowups.default);
      }

      await sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <div className="chat-container">
      <div className="chat-container__messages">
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          onSelectSuggestion={handleSend}
          followupSuggestions={followupSuggestions}
        />
      </div>

      <div className="chat-container__input-area" id="chat-input">
        <ChatInput
          onSend={handleSend}
          onStop={stopStreaming}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
};

export default ChatContainer;

