import { type FC } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type IconProps = {
  className?: string;
  src: IconSvgElement;
};

const Icon: FC<IconProps> = ({ className = "", src }) => {
  return <HugeiconsIcon className={className} icon={src} />;
};

export default Icon;
