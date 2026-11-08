import { useState, useEffect, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { themeController, type Theme } from "@controllers/ThemeController";
import { audioController } from "@controllers/AudioController";
import AuroraBg from "@components/AuroraBg";
import Icon from "@components/Icon";
import { IcSun, IcMoon, IcVolumeHigh, IcVolumeMute } from "@assets/icons";
import LogoAj from "@assets/image/logo-aj.svg";

import "./ChatLayout.scss";

interface ChatLayoutProps {
  children?: ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(themeController.getTheme());
  const [isMuted, setIsMuted] = useState<boolean>(audioController.getMuted());

  useEffect(() => {
    const unsubTheme = themeController.subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return () => unsubTheme();
  }, []);

  const handleToggleTheme = () => {
    themeController.toggleTheme();
  };

  const handleToggleMute = () => {
    const nextMuted = audioController.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="chat-layout">
      <a href="#chat-input" className="skip-link">
        {t("a11y.skipToInput", "Skip to chat input")}
      </a>

      <header className="chat-layout__header">
        <div className="chat-layout__brand">
          <img
            src={LogoAj}
            alt={t("a11y.brandLogo", "Amit Joshi")}
            className="chat-layout__logo"
            width={32}
            height={32}
          />
          <span className="chat-layout__brand-name">Amit Joshi</span>
        </div>

        <div className="chat-layout__actions">
          <button
            type="button"
            className="chat-layout__action-btn"
            onClick={handleToggleMute}
            aria-label={
              isMuted
                ? t("a11y.unmuteAudio", "Unmute audio")
                : t("a11y.muteAudio", "Mute audio")
            }
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            <Icon
              className="chat-layout__action-icon"
              src={isMuted ? IcVolumeMute : IcVolumeHigh}
            />
          </button>

          <button
            type="button"
            className="chat-layout__action-btn"
            onClick={handleToggleTheme}
            aria-label={
              theme === "dark"
                ? t("a11y.switchToLight", "Switch to light theme")
                : t("a11y.switchToDark", "Switch to dark theme")
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            <Icon
              className="chat-layout__action-icon"
              src={theme === "dark" ? IcSun : IcMoon}
            />
          </button>
        </div>
      </header>

      <main className="chat-layout__main" id="chat-container">
        <div className="chat-layout__content">{children}</div>
      </main>

      <AuroraBg />
    </div>
  );
};

export default ChatLayout;
