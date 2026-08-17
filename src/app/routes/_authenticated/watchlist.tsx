import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/watchlist")({
  component: WatchlistRoute,
});

function WatchlistRoute() {
  return <div>Watchlist placeholder</div>;
}
