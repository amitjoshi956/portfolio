export const ChatConfig = {
  maxHistoryTurns: 10,
  maxOutputTokens: 350,
  maxFollowupSuggestions: 3,
  maxTextareaLines: 4,
} as const;

export const MessageRole = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
} as const;

export const MessageStatus = {
  PENDING: "pending",
  STREAMING: "streaming",
  COMPLETE: "complete",
  ERROR: "error",
} as const;

export const SseToken = {
  DATA_PREFIX: "data: ",
  DONE: "[DONE]",
} as const;

export const DefaultSuggestionKeys = {
  TECH_STACK: "chat.defaultSuggestions.techStack",
  PROJECTS: "chat.defaultSuggestions.projects",
  EXPERIENCE: "chat.defaultSuggestions.experience",
} as const;

export type DefaultSuggestionKey = (typeof DefaultSuggestionKeys)[keyof typeof DefaultSuggestionKeys];
