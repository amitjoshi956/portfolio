import { useTranslation } from "react-i18next";
import Button from "@components/Button";
import IgWorkDiscuss from "@assets/image/work-discussion.svg";
import { IcRocket, IcCodeFolder } from "@assets/icons";

import "./Landing.scss";

const Landing = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "landing" });

  const handleWorkWithMe = () => {};

  return (
    <main id="#home" className="landing">
      <section className="landing__actions-section">
        <div className="landing__msg-container">
          <h3 className="landing__subtitle-msg">{t("subtitleMsg")}</h3>
          <h1 className="landing__title-msg">
            {t("titleMsg1")}
            <b className="landing__title-msg--highlight">{` ${t("ideas")} `}</b>
            {t("titleMsg2")}
            <b className="landing__title-msg--highlight">{` ${t(
              "reality"
            )}`}</b>
          </h1>
        </div>
        <div className="landing__actions">
          <Button
            variant="primary"
            label={t("workWithMe")}
            iconSrc={IcRocket}
            onClick={handleWorkWithMe}
          />
          <Button
            variant="glass"
            label={t("viewMyWork")}
            iconSrc={IcCodeFolder}
            onClick={handleWorkWithMe}
          />
        </div>
      </section>
      <section className="landing__infographic-section">
        <img
          src={IgWorkDiscuss}
          alt="let's discuss work"
          className="landing__infographic"
        />
      </section>
    </main>
  );
};

export default Landing;
