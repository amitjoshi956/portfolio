import { ApiClient } from "../client";
import { Endpoints } from "@common/constants";

export type HealthResponse = {
  status: string;
  timestamp?: string;
};

export const HealthService = {
  checkHealth: async (): Promise<HealthResponse> => {
    return ApiClient<HealthResponse>(Endpoints.HEALTH_CHECK);
  },
};
