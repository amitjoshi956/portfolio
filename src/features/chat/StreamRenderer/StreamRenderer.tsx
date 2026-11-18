import { useMemo, type FC } from "react";
import Markdown from "react-markdown";
import { parseStreamContent } from "./streamParser";
import "./StreamRenderer.scss";

export type StreamRendererProps = {
  content: string;
  isStreaming?: boolean;
};

const StreamRenderer: FC<StreamRendererProps> = ({
  content,
  isStreaming = false,
}) => {
  const parsed = useMemo(
    () => parseStreamContent(content, isStreaming),
    [content, isStreaming]
  );

  return (
    <div className="stream-renderer">
      {parsed.segments.map((segment, idx) => {
        if (segment.type === "widget") {
          const itemCount = Array.isArray(segment.data)
            ? `${segment.data.length} items`
            : typeof segment.data === "object" && segment.data !== null
            ? `${Object.keys(segment.data).length} attributes`
            : "payload attached";

          return (
            <div
              key={`widget_${segment.widgetType}_${idx}`}
              className="stream-renderer__widget-placeholder"
              role="region"
              aria-label={`Widget: ${segment.widgetType}`}
            >
              <div className="stream-renderer__widget-placeholder-header">
                <span className="stream-renderer__widget-placeholder-badge">
                  ✦ {segment.widgetType}
                </span>
                <span className="stream-renderer__widget-placeholder-info">
                  {itemCount}
                </span>
              </div>
            </div>
          );
        }

        const isLastTextSegment = idx === parsed.segments.length - 1;

        return (
          <div key={`text_${idx}`} className="stream-renderer__text">
            <Markdown>{segment.content}</Markdown>
            {isStreaming && isLastTextSegment && (
              <span className="stream-renderer__cursor" aria-hidden="true" />
            )}
          </div>
        );
      })}

      {isStreaming && parsed.segments.length === 0 && (
        <span className="stream-renderer__cursor" aria-hidden="true" />
      )}
    </div>
  );
};

export default StreamRenderer;

