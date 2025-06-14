import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExchangeContextProvider } from "./context/exchange/exchange.tsx";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ExchangeContextProvider>
        <App />
      </ExchangeContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
