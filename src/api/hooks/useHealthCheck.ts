import { useQuery } from "@tanstack/react-query";
import { HealthService } from "../services/health.service";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ["health"],
    staleTime: 1000 * 60 * 10,
    retry: false,
    queryFn: HealthService.checkHealth,
  });
};
