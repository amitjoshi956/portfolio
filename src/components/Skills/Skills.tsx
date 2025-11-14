import { type FC } from "react";
import type { Skill } from "@base/type/about";
import SkillCard from "./SkillCard";

import "./Skills.scss";

type SkillsProp = {
  skills: Skill[];
};

const Skills: FC<SkillsProp> = ({ skills }) => {
  return (
    <div className="skills">
      <ul className="skills__list">
        {skills.map(({ id, ...rest }) => (
          <li key={id} className="skills__item">
            <SkillCard id={id} {...rest} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
