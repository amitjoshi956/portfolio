import { useTranslation } from "react-i18next";
import Logo from "/logo-aj.svg";

import "./Header.scss";

const Header = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "header" });

  return (
    <header className="header">
      <a href="#home" className="header__brand">
        <img className="header__brand-logo" src={Logo} />
        <span className="header__brand-name">{t("brandName")}</span>
      </a>
      <nav className="header__navigation">
        <a href="#home" className="header__navlink">
          {t("home")}
        </a>
        <a href="#about" className="header__navlink">
          {t("about")}
        </a>
        <a href="#experience" className="header__navlink">
          {t("experience")}
        </a>
        <a href="#projects" className="header__navlink">
          {t("projects")}
        </a>
        <a href="#testimonials" className="header__navlink">
          {t("testimonials")}
        </a>
        <a href="#contact" className="header__navlink">
          {t("contact")}
        </a>
      </nav>
    </header>
  );
};

export default Header;
