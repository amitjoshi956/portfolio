import { type FC } from "react";
import { Button as BaseButton } from "@radix-ui/themes";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import "./Button.scss";

export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant =
  | "primary"
  | "glass"
  | "text"
  | "outlined"
  | "link"
  | "icon-only";
export type IconPlacement = "left" | "right";

const getButtonContent = (
  variant: ButtonVariant,
  label = "",
  iconSrc?: IconSvgElement,
  iconPlacement?: IconPlacement
) => {
  const icon = iconSrc && (
    <HugeiconsIcon className="button__icon" icon={iconSrc} />
  );

  if (variant === "icon-only") {
    return icon;
  }

  return (
    <>
      {iconPlacement === "left" && icon}
      {label && <span className="button__label">{label}</span>}
      {iconPlacement === "right" && icon}
    </>
  );
};

type ButtonProps = {
  className?: string;
  label?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  iconPlacement?: IconPlacement;
  iconSrc?: IconSvgElement;
  disabled?: boolean;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({
  className = "",
  label = "",
  type = "button",
  variant = "primary",
  disabled = false,
  iconPlacement = "left",
  iconSrc,
  onClick,
}) => {
  const content = getButtonContent(variant, label, iconSrc, iconPlacement);

  return (
    <BaseButton
      type={type}
      className={`button button--${variant} ${className}`}
      aria-label={`${label} button`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </BaseButton>
  );
};

export default Button;
