import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useSessionStore } from "@/shared/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!useSessionStore.getState().isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
