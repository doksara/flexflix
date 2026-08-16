import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfileRoute,
});

function ProfileRoute() {
  return <div>Profile placeholder</div>;
}
