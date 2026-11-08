export const AppConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "https://portfolio-core-ywcp.onrender.com",
    endpoints: {
      healthCheck: "/health",
      contactRequest: "/contact-request",
      chatStream: "/api/chat",
    },
    timeoutMs: 30000,
  },
  storage: {
    dbName: "aj_portfolio_db",
    dbVersion: 1,
    chatStoreName: "conversations",
    settingsStoreName: "settings",
    chatTtlMs: 7 * 24 * 60 * 60 * 1000, // 1 week TTL
  },
  chat: {
    maxHistoryTurns: 10,
    maxOutputTokens: 350,
    maxFollowupSuggestions: 3,
    maxTextareaLines: 4,
  },
  theme: {
    storageKey: "aj_portfolio_theme",
  },
  audio: {
    storageKey: "aj_portfolio_audio_muted",
  },
} as const;

