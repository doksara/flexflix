import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

import { queryClient, setUnauthorizedHandler } from "@/shared/api";
import { useSessionStore } from "@/shared/auth";
import { ApiError } from "@/shared/ui/api-error";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { Toaster } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  useEffect(() => {
    setUnauthorizedHandler(() => {
      const { isAuthenticated, clearSession } = useSessionStore.getState();
      if (isAuthenticated()) {
        clearSession();
        window.location.assign("/login");
      }
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary fallback={(_, reset) => <ApiError onRetry={reset} />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
