import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/movie/$id")({
  component: MovieDetailRoute,
});

function MovieDetailRoute() {
  const { id } = Route.useParams();
  return <div>Movie detail placeholder ({id})</div>;
}
