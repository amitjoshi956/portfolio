import type { ChangeEvent, FC } from "react";
import { classnames } from "@common/utils";
import { IcAlert } from "@assets/icons";
import Icon from "@components/Icon";

import "./Input.scss";

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

type InputProps = {
  name: string;
  className?: string;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: string;
  onChange?: (value: string, fieldName: string) => void;
};

const Input: FC<InputProps> = ({
  name,
  className = "",
  type = "text",
  disabled = false,
  required = false,
  label = "",
  placeholder = "",
  value,
  error = "",
  onChange,
}) => {
  const inputClass = classnames({
    input__field: true,
    "input__field--disabled": disabled,
    "input__field--invalid": !!error.trim() && !disabled,
    "input__field--valid": !!value && !error.trim().length && !disabled,
    [className]: !!className.trim(),
  });

  const labelClass = classnames({
    input__label: true,
    "input__label--disabled": disabled,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value, e.target.name);
  };

  return (
    <div className="input">
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="input__label-required">*</span>}
      </label>
      <div className="input__field-container">
        <input
          className={inputClass}
          name={name}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
        />
        {error && (
          <div className="input__error">
            <Icon className="input__error-icon" src={IcAlert} />
            <span className="input__error-message">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
