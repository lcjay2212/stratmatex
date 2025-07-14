import * as Sentry from "@sentry/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { router } from "./Routes";
import { useWebSocketStore } from "./store/useWebSocketStore";
import { WebSocketMessage } from "./types/websocket";
import { queryClient } from "./utils/queryClient.ts";

Sentry.init({
  dsn: import.meta.env.VITE_SENTY_DSN,
  integrations: [],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});

function App() {
  const connect = useWebSocketStore((state) => state.connect);

  useEffect(() => {
    // Initialize WebSocket connection
    connect({
      url: import.meta.env.VITE_WS_URL || "http://localhost:8080",
      onMessage: (message: WebSocketMessage) => {
        console.log("Socket.IO message received:", message);
      },
      onConnect: () => {
        console.log("Socket.IO connected");
      },
      onDisconnect: () => {
        console.log("Socket.IO disconnected");
      },
      onError: (error: unknown) => {
        console.error("Socket.IO error:", error);
      },
    }).catch(console.error);
  }, [connect]);

  return (
    <StrictMode>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {import.meta.env.MODE === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Toaster />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </StrictMode>
  );
}

export default App;
