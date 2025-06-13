import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { BerryProvider } from "./components/Themes/BerryContext.tsx";
import { ToastProvider } from "./providers/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BerryProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BerryProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
