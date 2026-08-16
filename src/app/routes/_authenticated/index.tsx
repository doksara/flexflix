import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: DiscoverRoute,
});

function DiscoverRoute() {
  return <div>Discover placeholder</div>;
}
