import { type FC } from "react";
import type { Experience } from "@base/type";
import TimelineItem from "./TimelineItem";

import "./Timeline.scss";

type TimelineProps = {
  className?: string;
  nodes: Experience[];
  onNodeSelection: (node: Experience) => void;
};

const Timeline: FC<TimelineProps> = ({ nodes, onNodeSelection }) => {
  return (
    <div className="timeline">
      {nodes.map((exp, idx) => {
        const isLatest = idx === 0;

        return (
          <TimelineItem
            key={exp.role}
            {...exp}
            isLatest={isLatest}
            onClick={() => onNodeSelection(exp)}
          />
        );
      })}
    </div>
  );
};

export default Timeline;
