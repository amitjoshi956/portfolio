import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, useHealthCheck } from "@api";
import { ChatLayout, ChatContainer } from "@features/chat";

function AppContent() {
  // Silent health check query on mount
  useHealthCheck();

  return (
    <ChatLayout>
      <ChatContainer />
    </ChatLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
