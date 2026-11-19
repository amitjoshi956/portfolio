export type WidgetSegment = {
  type: "widget";
  widgetType: string;
  data: unknown;
  raw: string;
};

export type TextSegment = {
  type: "text";
  content: string;
};

export type ContentSegment = TextSegment | WidgetSegment;

export type StreamParseResult = {
  segments: ContentSegment[];
  suggestions: string[];
  cleanText: string;
};

// Module-level regex patterns for parsing custom streaming tags
const SUGGESTIONS_REGEX = /:::suggestions\s*(\[[\s\S]*?\])\s*:::/g;
const UNCLOSED_SUGGESTIONS_REGEX = /:::suggestions[\s\S]*$/;
const WIDGET_REGEX = /:::widget\s*(\{[\s\S]*?\})\s*:::/g;
const UNCLOSED_WIDGET_REGEX = /:::widget[\s\S]*$/;
const UNQUOTED_KEY_REGEX = /([{,]\s*)(type|data)\s*:/g;

/**
 * Parses streamed AI response text containing optional widget tokens and suggestion tokens.
 *
 * Example tokens:
 * :::widget{"type":"skill-grid", "data":[...]}:::
 * :::suggestions["Question 1", "Question 2", "Question 3"]:::
 */
export function parseStreamContent(rawContent: string, isStreaming = false): StreamParseResult {
  let content = rawContent;
  const suggestions: string[] = [];

  // 1. Extract and remove suggestions tokens: :::suggestions[...]:::
  SUGGESTIONS_REGEX.lastIndex = 0;
  let suggMatch: RegExpExecArray | null;

  while ((suggMatch = SUGGESTIONS_REGEX.exec(content)) !== null) {
    try {
      const parsedSugg = JSON.parse(suggMatch[1]);
      if (Array.isArray(parsedSugg)) {
        suggestions.push(...parsedSugg.slice(0, 3));
      }
    } catch {
      // Incomplete or malformed JSON
    }
  }

  // Remove full suggestion tags from text
  content = content.replace(SUGGESTIONS_REGEX, "");

  // If streaming and there is an unclosed suggestions token at the tail, hide it
  if (isStreaming) {
    content = content.replace(UNCLOSED_SUGGESTIONS_REGEX, "");
  }

  // 2. Parse widget tokens: :::widget{...}:::
  WIDGET_REGEX.lastIndex = 0;
  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let widgetMatch: RegExpExecArray | null;

  while ((widgetMatch = WIDGET_REGEX.exec(content)) !== null) {
    const matchStart = widgetMatch.index;
    const matchEnd = WIDGET_REGEX.lastIndex;

    // Push preceding text segment if non-empty
    if (matchStart > lastIndex) {
      const textBefore = content.substring(lastIndex, matchStart);
      if (textBefore.trim()) {
        segments.push({ type: "text", content: textBefore });
      }
    }

    // Try parsing widget JSON
    const rawPayload = widgetMatch[1];
    try {
      // Normalize unquoted keys if necessary (e.g. {type:"...", data:...} -> {"type":"...", "data":...})
      let jsonPayload = rawPayload;
      if (!jsonPayload.includes('"type"')) {
        jsonPayload = jsonPayload.replace(UNQUOTED_KEY_REGEX, '$1"$2":');
      }
      const parsed = JSON.parse(jsonPayload);
      if (parsed && typeof parsed.type === "string") {
        segments.push({
          type: "widget",
          widgetType: parsed.type,
          data: parsed.data,
          raw: widgetMatch[0],
        });
      } else {
        segments.push({ type: "text", content: widgetMatch[0] });
      }
    } catch {
      // If parsing fails, fall back to rendering as text
      segments.push({ type: "text", content: widgetMatch[0] });
    }

    lastIndex = matchEnd;
  }

  // Push remaining text after the last widget
  if (lastIndex < content.length) {
    let remaining = content.substring(lastIndex);
    // If streaming and there's an incomplete widget token at the very end, trim it from display
    if (isStreaming && UNCLOSED_WIDGET_REGEX.test(remaining)) {
      remaining = remaining.replace(UNCLOSED_WIDGET_REGEX, "");
    }

    if (remaining.trim()) {
      segments.push({ type: "text", content: remaining });
    }
  }

  const cleanText = segments
    .filter((s): s is TextSegment => s.type === "text")
    .map((s) => s.content)
    .join("\n\n");

  return {
    segments,
    suggestions: suggestions.slice(0, 3),
    cleanText,
  };
}
