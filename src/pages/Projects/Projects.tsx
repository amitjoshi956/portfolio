import { useTranslation } from "react-i18next";
import { Carousel } from "@components/.";
import { Projects as ProjectsData } from "./projects.data";
import ProjectCard from "./ProjectCard";

import "./Projects.scss";

const Projects = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "projects" });
  const { t: tSkill } = useTranslation(["common"], { keyPrefix: "skills" });

  const TranslatedData = ProjectsData.map(
    ({ title, description, technologies, ...project }) => ({
      ...project,
      title: t(title),
      description: t(description),
      technologies: technologies.map((tech) => tSkill(tech)),
    })
  );

  return (
    <div id="projects" className="projects">
      <h1 className="projects__title">{t("title")}</h1>

      <div className="projects__carousel-container">
        <Carousel
          data={TranslatedData}
          itemsToScroll={2}
          gap={24}
          render={(project) => <ProjectCard {...project} />}
        />
      </div>
    </div>
  );
};

export default Projects;
