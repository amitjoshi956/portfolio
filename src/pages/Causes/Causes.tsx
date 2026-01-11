import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import { CausesCTAUrl } from "@base/const";
import CauseImg from "/causes__bg-cover.png";
import { IcBook } from "@assets/icons";
import { Button } from "@components/.";

import "./Causes.scss";

const Causes = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "causes" });
  const { t: tCommon } = useTranslation(["common"]);

  const onCTAClick = () => {
    window.open(CausesCTAUrl, "_blank");
  };

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
