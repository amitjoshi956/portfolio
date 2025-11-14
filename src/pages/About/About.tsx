import { useTranslation } from "react-i18next";
import type { TabItem } from "@base/type";
import {
  AllSkills,
  BackendSkills,
  DevopsSkills,
  FrontendSkills,
  ProgrammingSkills,
  TestingSkills,
  ToolsSkills,
} from "@base/const";
import { Skill } from "@base/enum";
import Headshot from "/headshot__bio-pic.svg";
import { TabView, Skills } from "@components/.";

import "./About.scss";

const About = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "about" });
  const { t: tSkill } = useTranslation(["common"], { keyPrefix: "skills" });

  const SkillTabs: TabItem[] = [
    {
      id: Skill.All,
      label: t("all"),
      Content: () => <Skills skills={AllSkills(tSkill)} />,
    },
    {
      id: Skill.Programming,
      label: t("programming"),
      Content: () => <Skills skills={ProgrammingSkills(tSkill)} />,
    },
    {
      id: Skill.Frontend,
      label: t("frontend"),
      Content: () => <Skills skills={FrontendSkills(tSkill)} />,
    },
    {
      id: Skill.Backend,
      label: t("backend"),
      Content: () => <Skills skills={BackendSkills(tSkill)} />,
    },
    {
      id: Skill.Tools,
      label: t("tools"),
      Content: () => <Skills skills={ToolsSkills(tSkill)} />,
    },
    {
      id: Skill.Devops,
      label: t("devops"),
      Content: () => <Skills skills={DevopsSkills(tSkill)} />,
    },
    {
      id: Skill.Testing,
      label: t("testing"),
      Content: () => <Skills skills={TestingSkills(tSkill)} />,
    },
  ];

  return (
    <div id="about" className="about">
      <section className="about__bio">
        <img src={Headshot} alt="" className="about__bio-pic" />
        <p className="about__bio-text">{t("bio")}</p>
      </section>
      <section className="about__skills">
        <TabView tabs={SkillTabs} />
      </section>
    </div>
  );
};

export default About;
