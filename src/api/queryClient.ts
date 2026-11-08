import { QueryClient } from "@tanstack/react-query";
import { HttpStatus } from "@common/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error) => {
        // Do not retry 4xx client errors
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status: number }).status;
          if (
            status >= HttpStatus.BAD_REQUEST &&
            status < HttpStatus.INTERNAL_SERVER_ERROR
          ) {
            return false;
          }
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
