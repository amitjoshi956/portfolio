import type { FC } from "react";
import type { IconSvgElement } from "@hugeicons/react";

export type TabItem = {
  id: string;
  label: string;
  Content: FC;
  onClick?: (id: string) => void;
};

export type Skill = {
  id: string;
  title: string;
  rating: number;
  experience: number;
  icon?: IconSvgElement;
  category?: string;
};

export type Experience = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  duration?: string;
  description: string[];
  skills: string[];
};

export type Project = {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
};

