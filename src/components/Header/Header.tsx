import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "@base/const";
import Logo from "/logo-aj.svg";
import Button from "@components/Button";

import "./Header.scss";

const Header = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "header" });
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = Navigation.map(({ id }) =>
      document.getElementById(id)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setActiveId(targetId);
      targetElement.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <header className="header">
      <a href="#home" className="header__brand">
        <img className="header__brand-logo" src={Logo} />
        <span className="header__brand-name">{t("brandName")}</span>
      </a>
      <nav className="header__navigation">
        {Navigation.map(({ id, labelKey }) => {
          const activeClass = activeId === id ? "header__navlink--active" : "";
          const navlinkClass = `header__navlink ${activeClass}`;

          return (
            <Button
              key={id}
              className={navlinkClass}
              variant="link"
              label={t(labelKey)}
              onClick={() => handleLinkClick(id)}
            />
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
