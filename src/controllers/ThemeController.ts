import { AppConfig } from "@config/constants";
import { storageController } from "./StorageController";

export type Theme = "dark" | "light";

type ThemeChangeObserver = (theme: Theme) => void;

class ThemeController {
  private currentTheme: Theme = "dark";
  private observers: Set<ThemeChangeObserver> = new Set();

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof window === "undefined") return;

    const savedTheme = storageController.getItem<Theme | null>(
      AppConfig.theme.storageKey,
      null
    );

    if (savedTheme === "dark" || savedTheme === "light") {
      this.setTheme(savedTheme, false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setTheme(prefersDark ? "dark" : "light", false);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const hasManualSetting = storageController.getItem<Theme | null>(
          AppConfig.theme.storageKey,
          null
        );
        if (!hasManualSetting) {
          this.setTheme(e.matches ? "dark" : "light", false);
        }
      });
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme, persist = true): void {
    this.currentTheme = theme;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (persist) {
      storageController.setItem(AppConfig.theme.storageKey, theme);
    }
    this.notify();
  }

  toggleTheme(): Theme {
    const nextTheme: Theme = this.currentTheme === "dark" ? "light" : "dark";
    this.setTheme(nextTheme, true);
    return nextTheme;
  }

  subscribe(observer: ThemeChangeObserver): () => void {
    this.observers.add(observer);
    observer(this.currentTheme);
    return () => this.observers.delete(observer);
  }

  private notify(): void {
    this.observers.forEach((obs) => obs(this.currentTheme));
  }
}

export const themeController = new ThemeController();
