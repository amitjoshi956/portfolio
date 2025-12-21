import type { ChangeEvent, FC } from "react";
import { classnames } from "@common/utils";
import { IcAlert } from "@assets/icons";
import Icon from "@components/Icon";

import "./TextArea.scss";

const DefaultRows = 4;

type TextAreaProps = {
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  resizable?: boolean;
  rows?: number;
  onChange?: (value: string, fieldName: string) => void;
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
  rows = DefaultRows,
  onChange,
}) => {
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
    [`${className}-field`]: !!className.trim(),
  });

  const labelClass = classnames({
    textarea__label: true,
    "textarea__label--disabled": disabled,
    [`${className}-label`]: !!className.trim(),
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value, e.target.name);
  };

  return (
    <div className={rootClass}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="textarea__label-required">*</span>}
      </label>
      <div className="textarea__field-container">
        <textarea
          className={textareaClass}
          name={name}
          id={name}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={handleChange}
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
