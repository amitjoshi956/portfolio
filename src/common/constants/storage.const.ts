export const StorageConfig = {
  DB_NAME: "aj_portfolio_db",
  DB_VERSION: 1,
  CHAT_STORE_NAME: "conversations",
  SETTINGS_STORE_NAME: "settings",
  CHAT_TTL_MS: 7 * 24 * 60 * 60 * 1000, // 1 week TTL
  INDEX_UPDATED_AT: "updatedAt",
  INDEX_KEY_PATH: "id",
  TRANSACTION_READWRITE: "readwrite",
  TRANSACTION_READONLY: "readonly",
  CURSOR_DIRECTION_PREV: "prev",
} as const;

export const StorageKeys = {
  THEME: "aj_portfolio_theme",
  AUDIO_MUTED: "aj_portfolio_audio_muted",
} as const;
