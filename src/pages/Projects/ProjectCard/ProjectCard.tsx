import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { IcGithub, IcLinkForward } from "@assets/icons";
import type { Project } from "../projects.data";
import { Button, Chip } from "@components/.";

import "./ProjectCard.scss";

type ProjectCardProps = Project;

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
}) => {
  const { t } = useTranslation(["common"], { keyPrefix: "projects" });

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="project-card">
      <div className="project-card__image-container">
        <img src={image} alt={title} className="project-card__image" />
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        <div className="project-card__technologies">
          {technologies.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>

        <div className="project-card__actions">
          <Button
            label={t("github")}
            variant="glass"
            iconSrc={IcGithub}
            iconPlacement="left"
            onClick={() => handleOpenLink(githubUrl)}
          />
          <Button
            label={t("liveDemo")}
            variant="primary"
            iconSrc={IcLinkForward}
            iconPlacement="left"
            onClick={() => handleOpenLink(liveUrl)}
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
