import { createRootRoute, Outlet } from "@tanstack/react-router";

// No errorComponent here: routes without their own errorComponent (e.g.
// /login) bubble their error out of the router to the app-level
// ErrorBoundary in src/app/root.tsx, which renders the same ApiError
// fallback. Authenticated routes get their own errorComponent (see
// _authenticated.tsx) so the AppShell layout stays visible on error.
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
