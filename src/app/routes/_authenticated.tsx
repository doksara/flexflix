import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useSessionStore, waitForSessionHydration } from "@/shared/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    await waitForSessionHydration();
    if (!useSessionStore.getState().isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
