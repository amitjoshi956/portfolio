import { useMemo, useState, type FC } from "react";
import type { Skill } from "@base/type/about";
import SkillCard from "./SkillCard";

import "./Skills.scss";
import { useTranslation } from "react-i18next";

type SkillsProp = {
  skills: Skill[];
};

const Skills: FC<SkillsProp> = ({ skills }) => {
  const { t } = useTranslation(["common"], { keyPrefix: "about" });
  const [search, setSearch] = useState<string>("");

  const SkillsList = useMemo(() => {
    const sortedSkills = skills.sort((s1, s2) => s2.rating - s1.rating);

    if (!search) {
      return sortedSkills;
    }

    const filteredSkills = sortedSkills.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );

    return filteredSkills;
  }, [skills, search]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  return (
    <div className="skills">
      <div className="skills__actions">
        <input
          type="text"
          className="skills__search"
          placeholder={t("searchPlaceholder")}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="skills__list-container">
        <ul className="skills__list">
          {SkillsList.map(({ id, ...rest }) => (
            <li key={id} className="skills__item">
              <SkillCard id={id} {...rest} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
