import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useSessionStore, waitForSessionHydration } from "@/shared/auth";
import { ApiError } from "@/shared/ui/api-error";
import { AppShell } from "@/widgets/app-shell";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    await waitForSessionHydration();
    if (!useSessionStore.getState().isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
  errorComponent: ({ reset }) => (
    <AppShell>
      <ApiError onRetry={reset} />
    </AppShell>
  ),
});

function AuthenticatedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
