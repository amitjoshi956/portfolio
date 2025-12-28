import { ExperienceData } from "@base/const";
import ExperienceCard from "./ExperienceCard";

import "./Experience.scss";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "experience" });

  return (
    <div id="experience" className="experience">
      <h1 className="experience__title">{t("title")}</h1>
      <div className="experience__timeline">
        {ExperienceData.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
