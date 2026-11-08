import {
  useEffect,
  useRef,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import { classnames } from "@common/utils";
import { IcAlert } from "@assets/icons";
import Icon from "@components/Icon";

import "./TextArea.scss";

const DefaultRows = 1;
const DefaultMaxRows = 4;

export type TextAreaProps = {
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  resizable?: boolean;
  autoGrow?: boolean;
  rows?: number;
  maxRows?: number;
  onChange?: (value: string, fieldName: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

const TextArea: FC<TextAreaProps> = ({
  name,
  className = "",
  disabled = false,
  required = false,
  label = "",
  placeholder = "",
  value = "",
  error = "",
  resizable = false,
  autoGrow = true,
  rows = DefaultRows,
  maxRows = DefaultMaxRows,
  onChange,
  onKeyDown,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const rootClass = classnames({
    textarea: true,
    [className]: !!className.trim(),
  });

  const textareaClass = classnames({
    textarea__field: true,
    "textarea__field--disabled": disabled,
    "textarea__field--invalid": !!error.trim() && !disabled,
    "textarea__field--valid": !!value && !error.trim().length && !disabled,
    "textarea__field--resizable": resizable,
    "textarea__field--autogrow": autoGrow,
    [`${className}-field`]: !!className.trim(),
  });

  const labelClass = classnames({
    textarea__label: true,
    "textarea__label--disabled": disabled,
    [`${className}-label`]: !!className.trim(),
  });

  // Adjust height on value change if autoGrow is enabled
  useEffect(() => {
    if (!autoGrow || !textareaRef.current) return;

    const el = textareaRef.current;
    el.style.height = "auto";

    // Calculate line height approximate or use scrollHeight
    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || 20;
    const paddingTop = parseFloat(computed.paddingTop) || 0;
    const paddingBottom = parseFloat(computed.paddingBottom) || 0;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, autoGrow, maxRows]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value, e.target.name);
  };

  return (
    <div className={rootClass}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
          {required && <span className="textarea__label-required">*</span>}
        </label>
      )}
      <div className="textarea__field-container">
        <textarea
          ref={textareaRef}
          className={textareaClass}
          name={name}
          id={name}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        {error && (
          <div className="textarea__error">
            <Icon className="textarea__error-icon" src={IcAlert} />
            <span className="textarea__error-message">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
