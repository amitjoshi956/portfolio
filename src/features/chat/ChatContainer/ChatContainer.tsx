import { useCallback, type FC } from "react";
import { useChat } from "@common/hooks";
import MessageList from "../MessageList";
import ChatInput from "../ChatInput";

import "./ChatContainer.scss";

const DefaultFollowups = [
  "What is his tech stack?",
  "Show me his projects",
  "Walk me through his experience",
];

const ChatContainer: FC = () => {
  const { messages, isStreaming, sendMessage, stopStreaming } = useChat();

  // Resolve contextual follow-up suggestions from the latest assistant message
  const latestAssistantMessage = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  const followupSuggestions =
    latestAssistantMessage?.followups && latestAssistantMessage.followups.length > 0
      ? latestAssistantMessage.followups
      : DefaultFollowups;

  const handleSend = useCallback(
    async (text: string) => {
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
