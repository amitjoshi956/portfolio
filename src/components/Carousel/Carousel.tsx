import React, {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { IcChevronLeft, IcChevronRight } from "@assets/icons";

import "./Carousel.scss";

const DefaultGap = 16;
const DefaultItemsToScroll = 1;

export type CarouselItem = {
  id: string | number;
  [key: string]: unknown;
};

type CarouselProps<T extends CarouselItem> = {
  data: T[];
  className?: string;
  gap?: number;
  itemsToScroll?: number;
  render?: (item: T) => ReactNode;
};

const Carousel = <T extends CarouselItem>({
  data,
  className = "",
  gap = DefaultGap,
  itemsToScroll = DefaultItemsToScroll,
  render,
}: CarouselProps<T>): React.ReactElement => {
  const { t } = useTranslation("common");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkOverflow = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isOverflowing = scrollWidth > clientWidth;

    setShowLeftButton(isOverflowing && scrollLeft > 0);
    setShowRightButton(
      isOverflowing && scrollLeft < scrollWidth - clientWidth - 1
    );
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow, data]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstItem = container.firstElementChild as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const scrollAmount = (itemWidth + gap) * itemsToScroll;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleScroll("left");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleScroll("right");
      }
    },
    [itemsToScroll, gap]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("keydown", handleKeyDown as EventListener);
    return () =>
      container.removeEventListener("keydown", handleKeyDown as EventListener);
  }, [handleKeyDown]);

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className={`carousel carousel--empty ${className}`}>
        <p className="carousel__empty-message">
          {t("carousel.noData", "No items to display")}
        </p>
      </div>
    );
  }

  // Handle single item - center it
  const isSingleItem = data.length === 1;

  return (
    <div className={`carousel ${className}`}>
      {showLeftButton && (
        <button
          className="carousel__button carousel__button--left"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          aria-disabled={!showLeftButton}
          type="button"
        >
          <HugeiconsIcon
            className="carousel__button-icon"
            icon={IcChevronLeft}
          />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className={`carousel__container ${
          isSingleItem ? "carousel__container--centered" : ""
        }`}
        style={{ gap: `${gap}px` }}
        onScroll={checkOverflow}
        tabIndex={0}
        role="region"
        aria-label="Carousel"
      >
        {data.map((item) => (
          <div key={item.id} className="carousel__item">
            {render ? (
              render(item)
            ) : (
              <div className="carousel__default-card">
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {showRightButton && (
        <button
          className="carousel__button carousel__button--right"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          aria-disabled={!showRightButton}
          type="button"
        >
          <HugeiconsIcon
            className="carousel__button-icon"
            icon={IcChevronRight}
          />
        </button>
      )}
    </div>
  );
};

export default Carousel;
