type ExperienceDate = {
  month: string;
  year: number;
};

export type Experience = {
  role: string;
  company: string;
  startDate: ExperienceDate;
  endDate?: ExperienceDate;
  description: string[];
  skills: string[];
};
