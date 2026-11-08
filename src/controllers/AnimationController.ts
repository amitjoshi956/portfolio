type MotionChangeObserver = (reduced: boolean) => void;

class AnimationController {
  private prefersReducedMotion: boolean = false;
  private observers: Set<MotionChangeObserver> = new Set();

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.prefersReducedMotion = query.matches;

    query.addEventListener("change", (e) => {
      this.prefersReducedMotion = e.matches;
      this.notify();
    });
  }

  getReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }

  subscribe(observer: MotionChangeObserver): () => void {
    this.observers.add(observer);
    observer(this.prefersReducedMotion);
    return () => this.observers.delete(observer);
  }

  private notify(): void {
    this.observers.forEach((obs) => obs(this.prefersReducedMotion));
  }
}

export const animationController = new AnimationController();

