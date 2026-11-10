import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { classnames } from "@common/utils";
import { DefaultSuggestionKeys } from "@common/constants";

import "./SuggestionChips.scss";

export interface SuggestionChipsProps {
  suggestions?: readonly string[] | string[];
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
  className?: string;
}

const SuggestionChips: FC<SuggestionChipsProps> = ({
  suggestions,
  onSelect,
  disabled = false,
  className = "",
}) => {
  const { t } = useTranslation();

  const resolvedSuggestions =
    suggestions ?? DefaultSuggestionKeys.map((key) => t(key));

  // Enforce max 3 suggestions as per architecture guidelines
  const activeSuggestions = resolvedSuggestions.slice(0, 3);

  if (activeSuggestions.length === 0) return null;

  const rootClass = classnames({
    "suggestion-chips": true,
    [className]: !!className.trim(),
  });

  return (
    <div
      className={rootClass}
      role="group"
      aria-label={t("chat.suggestionsGroup", "Suggested questions")}
    >
      {activeSuggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className="suggestion-chips__pill"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          aria-label={t("chat.askSuggestion", `Ask: ${suggestion}`)}
        >
          <span className="suggestion-chips__text">{suggestion}</span>
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
