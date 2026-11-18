export const Endpoints = {
  HEALTH_CHECK: "/api/health",
  CONTACT_REQUEST: "/api/contact-request",
  CHAT_STREAM: "/api/chat",
} as const;

export const ApiConfig = {
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    "https://portfolio-core-ywcp.onrender.com",
  timeoutMs: 30000,
} as const;
