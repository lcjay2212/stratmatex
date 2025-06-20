import * as Sentry from "@sentry/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { router } from "./Routes";
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
