import { createFileRoute } from "@tanstack/react-router";

import { MovieDetailPage } from "@/pages/movie-detail";

export const Route = createFileRoute("/_authenticated/movie/$id")({
  component: MovieDetailRoute,
});

function MovieDetailRoute() {
  const { id } = Route.useParams();
  return <MovieDetailPage id={Number(id)} />;
}
