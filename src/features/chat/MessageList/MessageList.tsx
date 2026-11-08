import { useEffect, useRef, type FC } from "react";
import { useTranslation } from "react-i18next";
import type { ChatMessage } from "@common/types";
import MessageBubble from "../MessageBubble";
import SuggestionChips from "../SuggestionChips";
import { DefaultSuggestions } from "@common/constants";

import "./MessageList.scss";

export interface MessageListProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
  onSelectSuggestion: (text: string) => void;
  followupSuggestions?: string[];
}

const MessageList: FC<MessageListProps> = ({
  messages,
  isStreaming = false,
  onSelectSuggestion,
  followupSuggestions,
}) => {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Smooth auto-scroll to latest message during streaming and on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Welcome state (empty conversation)
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <div className="message-list__welcome">
          <h1 className="message-list__title">
            {t("chat.welcomeTitle", "Ask me anything about Amit")}
          </h1>

          <div className="message-list__welcome-chips">
            <SuggestionChips
              suggestions={DefaultSuggestions}
              onSelect={onSelectSuggestion}
            />
          </div>
        </div>
      </div>
    );
  }

  // Mid-conversation scroll state
  const lastMessage = messages[messages.length - 1];
  const showFollowup =
    !isStreaming &&
    lastMessage?.role === "assistant" &&
    followupSuggestions &&
    followupSuggestions.length > 0;

  return (
    <div
      className="message-list message-list--active"
      role="log"
      aria-live="polite"
      aria-label={t("chat.logLabel", "Conversation with Amit's portfolio assistant")}
    >
      <div className="message-list__items">
        {messages.map((message, index) => {
          const isCurrentStreaming =
            isStreaming && index === messages.length - 1 && message.role === "assistant";

          return (
            <MessageBubble
              key={message.id || `msg_${index}`}
              message={message}
              isStreaming={isCurrentStreaming}
            />
          );
        })}

        {showFollowup && (
          <div className="message-list__followup">
            <SuggestionChips
              suggestions={followupSuggestions}
              onSelect={onSelectSuggestion}
            />
          </div>
        )}

        <div ref={bottomRef} className="message-list__anchor" />
      </div>
    </div>
  );
};

export default MessageList;
