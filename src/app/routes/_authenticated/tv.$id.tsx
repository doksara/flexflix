import { createFileRoute } from "@tanstack/react-router";

import { ShowDetailPage } from "@/pages/show-detail";

export const Route = createFileRoute("/_authenticated/tv/$id")({
  component: ShowDetailRoute,
});

function ShowDetailRoute() {
  const { id } = Route.useParams();
  return <ShowDetailPage id={Number(id)} />;
}
