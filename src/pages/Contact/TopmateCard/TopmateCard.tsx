import type { FC } from "react";
import { classnames } from "@common/utils";
import Button from "@components/Button";
import { IcUser } from "@assets/icons";

import "./TopmateCard.scss";

type TopmateCardProps = {
  className?: string;
  profileUrl: string;
  name: string;
  bio: string;
  description: string;
  ctaLabel: string;
};

const TopmateCard: FC<TopmateCardProps> = ({
  className = "",
  profileUrl,
  name,
  bio,
  description,
  ctaLabel,
}) => {
  const rootClass = classnames({
    "topmate-card": true,
    [className]: !!className.trim(),
  });

  const handleButtonClick = () => window.open(profileUrl, "_blank");

  return (
    <div className={rootClass}>
      <div className="topmate-card__content">
        <h4 className="topmate-card__name">{name}</h4>
        <p className="topmate-card__bio">{bio}</p>
        <p className="topmate-card__description">{description}</p>
      </div>
      <Button
        className="topmate-card__button"
        label={ctaLabel}
        iconSrc={IcUser}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default TopmateCard;
