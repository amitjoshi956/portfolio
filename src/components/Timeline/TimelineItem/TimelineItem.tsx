import { type FC } from "react";
import { classnames } from "@common/utils/classnames";
import { type Experience } from "@base/type/experience";

import "./TimelineItem.scss";

type TimelineItemProps = Partial<Experience> & {
  isLatest?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const TimelineItem: FC<TimelineItemProps> = ({
  isLatest = false,
  isActive = false,
  role,
  company,
  startDate,
  endDate,
  duration,
  onClick,
}) => {
  const rootClass = classnames({
    "timeline-item": true,
    "timeline-item--active": isActive,
  });

  const nodeClass = classnames({
    "timeline-item__node": true,
    "timeline-item__node--latest": isLatest,
    "timeline-item__node--active": isActive,
  });

  return (
    <div role="button" className={rootClass} onClick={onClick}>
      <div className="timeline-item__line" />
      <div className={nodeClass} />
      <div className="timeline-item__content">
        <h3 className="timeline-item__role">{role}</h3>
        <h4 className="timeline-item__company">{company}</h4>
        <p className="timeline-item__tenure">
          {startDate} - {endDate} ({duration})
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
