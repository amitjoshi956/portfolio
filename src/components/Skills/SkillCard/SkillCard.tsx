import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { Skill } from "@base/type";
import { Icon } from "@components/.";

import "./SkillCard.scss";

const getStarRating = (rating: number) => {
  let starRating = "";

  for (let i = 0; i < rating; i++) {
    starRating += "⭐️";
  }

  return starRating;
};

const SkillCard: FC<Skill> = ({ title, experience, rating, icon }) => {
  const { t } = useTranslation(["common"]);

  return (
    <div className="skill-card">
      <div className="skill-card__header">
        {icon && <Icon className="skill-card__icon" src={icon} />}
        <h4 className="skill-card__title" title={title}>{title}</h4>
      </div>
      <div className="skill-card__meta">
        <span className="skill-card__rating">
          {`${experience} ${t("years")}`}
        </span>
        <span className="skill-card__experience">{getStarRating(rating)}</span>
      </div>
    </div>
  );
};

export default SkillCard;
