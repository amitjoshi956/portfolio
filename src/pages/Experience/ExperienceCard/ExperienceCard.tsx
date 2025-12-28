import { type FC } from "react";
import Chip from "@components/Chip";
import { type Experience } from "@base/type/experience";

import "./ExperienceCard.scss";

interface ExperienceCardProps extends Experience {
  className?: string;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  role,
  company,
  startDate,
  endDate,
  duration,
  description,
  skills,
}) => {
  return (
    <article className="experience-card">
      <h3 className="experience-card__role">{role}</h3>
      <h4 className="experience-card__company">{company}</h4>
      <p className="experience-card__tenure">
        {startDate} - {endDate} ({duration})
      </p>
      <ul className="experience-card__description">
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <div className="experience-card__skills">
        {skills.map((skill, idx) => (
          <Chip key={idx} label={skill} />
        ))}
      </div>
    </article>
  );
};

export default ExperienceCard;
