import { apiClient } from "../client";
import { AppConfig } from "@config/constants";

export interface HealthResponse {
  status: string;
  timestamp?: string;
}

export const healthService = {
  checkHealth: async (): Promise<HealthResponse> => {
    return apiClient<HealthResponse>(AppConfig.api.endpoints.healthCheck);
  },
};
