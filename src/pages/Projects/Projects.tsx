import { useTranslation } from "react-i18next";
import { Carousel } from "@components/.";
import { PROJECTS } from "./projects.data";
import ProjectCard from "./ProjectCard";

import "./Projects.scss";

const Projects = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "projects" });

  return (
    <div id="projects" className="projects">
      <h1 className="projects__title">{t("title")}</h1>

      <div className="projects__carousel-container">
        <Carousel
          data={PROJECTS}
          itemsToScroll={1}
          gap={24}
          render={(project: (typeof PROJECTS)[number]) => (
            <ProjectCard {...project} />
          )}
        />
      </div>
    </div>
  );
};

export default Projects;
