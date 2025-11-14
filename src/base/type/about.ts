import { type IconSvgElement } from "@hugeicons/react";

export type Skill = {
  id: string;
  title: string;
  rating: number;
  experience: number;
  icon?: IconSvgElement;
};
