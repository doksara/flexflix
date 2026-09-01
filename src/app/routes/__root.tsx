import { createRootRoute, Outlet } from "@tanstack/react-router";

import { ApiError } from "@/shared/ui/api-error";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ reset }) => <ApiError onRetry={reset} />,
});

function RootComponent() {
  return <Outlet />;
}
