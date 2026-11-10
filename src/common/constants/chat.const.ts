export const DefaultSuggestionKeys = [
  "chat.defaultSuggestions.techStack",
  "chat.defaultSuggestions.projects",
  "chat.defaultSuggestions.experience",
] as const;

export type DefaultSuggestionKey = (typeof DefaultSuggestionKeys)[number];
