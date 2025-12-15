import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import Button from "@components/Button";
import CauseImg from "/causes__bg-cover.png";
import "./Causes.scss";
import { IcBook } from "@assets/icons";

const Causes = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "causes" });
  const { t: tCommon } = useTranslation(["common"]);

  const onCTAClick = () => {};

  return (
    <div id="causes" className="causes">
      <header className="causes__header">
        <h1 className="causes__title">{t("title")}</h1>
      </header>
      <div className="causes__content">
        <section className="causes__info">
          <h6 className="causes__sub-title">
            {t("subTitle", { duration: tCommon("month") })}
          </h6>
          <Markdown>{t("content")}</Markdown>
          <Button
            className="causes__cta"
            label={t("ctaText")}
            iconSrc={IcBook}
            onClick={onCTAClick}
          />
        </section>
        <section className="causes__graphics">
          <img className="causes__image" src={CauseImg} alt={t("title")} />
        </section>
      </div>
    </div>
  );
};

export default Causes;
