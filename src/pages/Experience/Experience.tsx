import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@common/hooks";
import { ExperienceData } from "@base/const";
import type { Experience as ExperienceType } from "@base/type";
import { Timeline, Modal } from "@components/.";
import ExperienceDetails from "./ExperienceDetails";

import "./Experience.scss";

const Experience = () => {
  const { t } = useTranslation(["common"], { keyPrefix: "experience" });
  const [selectedRole, setSelectedRole] = useState<ExperienceType | null>(null);

  const isDesktop = useMediaQuery("(min-width: 769px)");
  const showSidePanel = isDesktop && selectedRole !== null;
  const showModal = !isDesktop && selectedRole !== null;

  const handleRoleClick = (role: ExperienceType) => {
    setSelectedRole(role);
  };

  const handleClose = () => {
    setSelectedRole(null);
  };

  return (
    <div id="experience" className="experience">
      <h1 className="experience__title">{t("title")}</h1>

      <div className="experience__content">
        <div className="experience__timeline-container">
          <Timeline nodes={ExperienceData} onNodeSelection={handleRoleClick} />
        </div>

        {showSidePanel && (
          <div className="experience__detail-container">
            <ExperienceDetails {...selectedRole} onClose={handleClose} />
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={handleClose}>
        {selectedRole && (
          <ExperienceDetails {...selectedRole} onClose={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default Experience;
