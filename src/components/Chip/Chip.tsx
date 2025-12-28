import type { FC } from "react";

import "./Chip.scss";

type ChipProps = {
  className?: string;
  label: string;
};

const Chip: FC<ChipProps> = ({ className = "", label }) => {
  return <span className={`chip ${className}`}>{label}</span>;
};

export default Chip;
