import { createFileRoute } from "@tanstack/react-router";

import { DiscoverPage } from "@/pages/discover";

interface DiscoverSearchParams {
  q?: string;
}

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: (search: Record<string, unknown>): DiscoverSearchParams => ({
    q: typeof search.q === "string" && search.q.length > 0 ? search.q : undefined,
  }),
  component: DiscoverRoute,
});

function DiscoverRoute() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <DiscoverPage
      query={q ?? ""}
      onQueryChange={(value) => navigate({ search: () => ({ q: value || undefined }), replace: true })}
    />
  );
}
