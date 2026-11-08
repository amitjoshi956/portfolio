import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, useHealthCheck } from "@api";
import ChatLayout from "@features/chat/ChatLayout";

function AppContent() {
  useHealthCheck();

  return <ChatLayout>{/* Shell initialized for Phase 1 */}</ChatLayout>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
