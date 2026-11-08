import { AppConfig } from "@config/constants";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export type RequestOptions = RequestInit & {
  timeoutMs?: number;
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { timeoutMs = AppConfig.api.timeoutMs, ...fetchOptions } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${AppConfig.api.baseUrl}${endpoint}`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: fetchOptions.signal || controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    clearTimeout(id);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (err: unknown) {
    clearTimeout(id);
    if (err instanceof ApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : "Unknown network error";
    throw new ApiError(message, 0);
  }
};
