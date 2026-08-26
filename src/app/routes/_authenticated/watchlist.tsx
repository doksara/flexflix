import { createFileRoute } from "@tanstack/react-router";

import { WatchlistPage } from "@/pages/watchlist";

export const Route = createFileRoute("/_authenticated/watchlist")({
  component: WatchlistPage,
});
