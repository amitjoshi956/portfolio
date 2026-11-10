import {
  useState,
  useRef,
  type FC,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import TextArea from "@components/TextArea";
import Icon from "@components/Icon";
import { IcSend, IcCancel } from "@assets/icons";
import { classnames } from "@common/utils";

import "./ChatInput.scss";

export interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isStreaming?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const ChatInput: FC<ChatInputProps> = ({
  onSend,
  onStop,
  isStreaming = false,
  disabled = false,
  placeholder,
  className = "",
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const defaultPlaceholder = t(
    "chat.inputPlaceholder",
    "Ask me anything about Amit..."
  );

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!value.trim() || disabled || isStreaming) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape" && isStreaming) {
      e.preventDefault();
      onStop?.();
    }
  };

  const rootClass = classnames({
    "chat-input": true,
    "chat-input--streaming": isStreaming,
    "chat-input--disabled": disabled,
    [className]: !!className.trim(),
  });

  return (
    <form ref={formRef} className={rootClass} onSubmit={handleSubmit}>
      <div className="chat-input__wrapper">
        <TextArea
          name="chat-message"
          className="chat-input__textarea"
          placeholder={placeholder || defaultPlaceholder}
          value={value}
          disabled={disabled}
          resizable={false}
          autoGrow={true}
          rows={1}
          maxRows={4}
          onChange={(newVal) => setValue(newVal)}
          onKeyDown={handleKeyDown}
        />

        <div className="chat-input__actions">
          {isStreaming ? (
            <button
              type="button"
              className="chat-input__btn chat-input__btn--stop"
              onClick={onStop}
              aria-label={t("chat.stopGenerating", "Stop generating")}
              title={t("chat.stopGenerating", "Stop generating")}
            >
              <Icon className="chat-input__btn-icon" src={IcCancel} />
            </button>
          ) : (
            <button
              type="submit"
              className="chat-input__btn chat-input__btn--send"
              disabled={!value.trim() || disabled}
              aria-label={t("chat.sendMessage", "Send message")}
              title={t("chat.sendMessage", "Send message")}
            >
              <Icon className="chat-input__btn-icon" src={IcSend} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ChatInput;

