import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginPage } from "@/pages/login";
import { useSessionStore, waitForSessionHydration } from "@/shared/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    await waitForSessionHydration();
    if (useSessionStore.getState().isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
