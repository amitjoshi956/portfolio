import { useState, useEffect, useCallback } from "react";
import { themeController, type Theme } from "@controllers/ThemeController";

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(themeController.getTheme());

  useEffect(() => {
    const unsubscribe = themeController.subscribe((newTheme) => {
      setThemeState(newTheme);
    });
    return () => unsubscribe();
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    themeController.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    return themeController.toggleTheme();
  }, []);

  return { theme, setTheme, toggleTheme };
};

export default useTheme;

