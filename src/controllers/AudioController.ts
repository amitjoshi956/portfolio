import { AppConfig } from "@config/constants";
import { storageController } from "./StorageController";

export type SoundEffect = "contactSuccess" | "contactError";

class AudioController {
  private isMuted: boolean = false;
  private audioCache: Map<SoundEffect, HTMLAudioElement> = new Map();

  private soundUrls: Record<SoundEffect, string> = {
    contactSuccess: "/sounds/success.webm",
    contactError: "/sounds/error.webm",
  };

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof window === "undefined") return;

    this.isMuted = storageController.getItem<boolean>(
      AppConfig.audio.storageKey,
      false
    );

    // Auto-mute if prefers-reduced-motion is active
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.isMuted = true;
    }
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
    storageController.setItem(AppConfig.audio.storageKey, muted);
  }

  toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  async play(effect: SoundEffect): Promise<void> {
    if (this.isMuted || typeof window === "undefined") return;

    try {
      let audio = this.audioCache.get(effect);
      if (!audio) {
        audio = new Audio(this.soundUrls[effect]);
        audio.preload = "auto";
        this.audioCache.set(effect, audio);
      }
      audio.currentTime = 0;
      await audio.play();
    } catch {
      // User hasn't interacted with document or playback was prevented
    }
  }
}

export const audioController = new AudioController();

