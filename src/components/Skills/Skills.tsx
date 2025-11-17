import { useState, type FC } from "react";
import type { Skill } from "@base/type/about";
import SkillCard from "./SkillCard";

import "./Skills.scss";
import { useTranslation } from "react-i18next";

type SkillsProp = {
  skills: Skill[];
};

const Skills: FC<SkillsProp> = ({ skills }) => {
  const { t } = useTranslation(["common"], { keyPrefix: "about" });
  const [SkillsList, setSkillsList] = useState(skills);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setSkillsList(skills);
      return;
    }
    const filteredSkills = skills.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSkillsList(filteredSkills);
  };

  return (
    <div className="skills">
      <input
        type="text"
        className="skills__search"
        placeholder={t("searchPlaceholder")}
        onChange={(e) => handleSearch(e.target.value)}
      />
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
