import * as Sentry from "@sentry/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { queryClient } from "./utils/queryClient.ts";

Sentry.init({
  dsn: import.meta.env.VITE_SENTY_DSN,
  integrations: [],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: import.meta.env.MODE,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <QueryClientProvider client={queryClient}>
          <App />
          {import.meta.env.MODE === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Toaster />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
