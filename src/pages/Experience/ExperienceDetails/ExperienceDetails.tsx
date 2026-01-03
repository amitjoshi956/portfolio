import { type FC } from "react";
import { type Experience } from "@base/type";
import { IcCancel } from "@assets/icons";
import { Button, Chip } from "@components/.";

import "./ExperienceDetails.scss";

type ExperienceDetailsProps = Experience & {
  onClose: () => void;
};

const ExperienceDetails: FC<ExperienceDetailsProps> = ({
  role,
  company,
  startDate,
  endDate,
  duration,
  description,
  skills,
  onClose,
}) => {
  return (
    <article className="experience-details">
      <header className="experience-details__header">
        <h3 className="experience-details__role">{role}</h3>
        <Button
          className="experience-details__close"
          variant="glass"
          iconSrc={IcCancel}
          onClick={onClose}
        />
      </header>
      <h5 className="experience-details__company">{company}</h5>
      <p className="experience-details__tenure">
        {startDate} - {endDate} ({duration})
      </p>
      <ul className="experience-details__description">
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <div className="experience-details__skills">
        {skills.map((skill, idx) => (
          <Chip key={idx} label={skill} />
        ))}
      </div>
    </article>
  );
};

export default ExperienceDetails;
