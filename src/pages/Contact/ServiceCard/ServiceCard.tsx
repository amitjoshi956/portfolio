import type { FC } from "react";
import { classnames } from "@common/utils";
import Button from "@components/Button";

import "./ServiceCard.scss";

type ServiceCardProps = {
  className?: string;
  title: string;
  description: string;
  link: string;
  buttonLabel: string;
};

const ServiceCard: FC<ServiceCardProps> = ({
  className = "",
  title,
  description,
  link,
  buttonLabel,
}) => {
  const rootClass = classnames({
    "service-card": true,
    [className]: !!className.trim(),
  });

  return (
    <div className={rootClass}>
      <h4 className="service-card__title">{title}</h4>
      <p className="service-card__description">{description}</p>
      <Button
        className="service-card__button"
        variant="glass"
        label={buttonLabel}
        onClick={() => window.open(link, "_blank")}
      />
    </div>
  );
};

export default ServiceCard;
