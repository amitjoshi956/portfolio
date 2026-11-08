import type { FC } from "react";
import Markdown from "react-markdown";
import type { ChatMessage } from "@common/types";
import { classnames } from "@common/utils";

import "./MessageBubble.scss";

export interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  isStreaming = false,
}) => {
  const isUser = message.role === "user";

  const rootClass = classnames({
    "message-bubble": true,
    "message-bubble--user": isUser,
    "message-bubble--assistant": !isUser,
  });

  if (isUser) {
    return (
      <div className={rootClass}>
        <div className="message-bubble__user-box">
          <p className="message-bubble__text">{message.content}</p>
        </div>
      </div>
    );
  }

  // Assistant Message (Claude-style clean flow on dark canvas)
  return (
    <div className={rootClass}>
      <div className="message-bubble__assistant-content">
        {message.content ? (
          <div className="message-bubble__markdown">
            <Markdown>{message.content}</Markdown>
            {isStreaming && (
              <span className="message-bubble__cursor" aria-hidden="true" />
            )}
          </div>
        ) : isStreaming ? (
          <div className="message-bubble__typing" aria-label="Thinking">
            <span className="message-bubble__typing-dot" />
            <span className="message-bubble__typing-dot" />
            <span className="message-bubble__typing-dot" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MessageBubble;
