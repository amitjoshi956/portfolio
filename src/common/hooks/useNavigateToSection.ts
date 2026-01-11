import { useEffect } from "react";

export const useNavigateToSection = (mapping: Record<string, string>) => {
  useEffect(() => {
    const sectionId = mapping[window.location.hash];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [mapping]);
};
