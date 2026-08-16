import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tv/$id")({
  component: ShowDetailRoute,
});

function ShowDetailRoute() {
  const { id } = Route.useParams();
  return <div>Show detail placeholder ({id})</div>;
}
