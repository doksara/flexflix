import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { deleteSession, useSessionStore } from "@/shared/auth";
import { useDocumentTitle } from "@/shared/lib/use-document-title";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

import { useProfileStats } from "../model/profile-stats";
import { ProgressBarList } from "./ProgressBarList";
import { RecentActivity } from "./RecentActivity";
import { StatsOverview } from "./StatsOverview";

export function ProfilePage() {
  useDocumentTitle("Profile — Flexflix");
  const navigate = useNavigate();
  const username = useSessionStore((state) => state.username);
  const sessionId = useSessionStore((state) => state.sessionId);
  const clearSession = useSessionStore((state) => state.clearSession);
  const stats = useProfileStats();

  async function handleLogout() {
    if (sessionId) {
      await deleteSession(sessionId).catch(() =>
        toast.error("Couldn't sign out of TMDB, but you've been logged out here."),
      );
    }
    clearSession();
    navigate({ to: "/login" });
  }

  return (
    <div className="flex flex-col gap-9 pb-8">
      <div className="flex items-center gap-5">
        <Avatar
          className="size-22"
          style={{
            boxShadow:
              "0 0 0 2px var(--surface-container-low), 0 0 0 4px var(--primary), var(--glow-primary)",
          }}
        >
          <AvatarFallback className="font-heading text-2xl font-bold">
            {username ? username.slice(0, 2).toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-heading text-2xl font-bold text-foreground">{username}</div>
          <div className="mt-0.5 text-sm text-muted-foreground">
            {stats.memberSinceLabel ? `Member since ${stats.memberSinceLabel}` : "TMDB account"}
          </div>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          <LogOut className="size-4" />
          Log out
        </Button>
      </div>

      <StatsOverview statCards={stats.statCards} />

      {stats.hasEntries ? (
        <>
          <ProgressBarList
            title="Status breakdown"
            variant="secondary"
            items={stats.statusBreakdown
              .filter((status) => status.count > 0)
              .map((status) => ({
                key: status.status,
                label: status.label,
                count: status.count,
                pct: status.pct,
              }))}
          />
          <ProgressBarList
            title="Genre breakdown"
            variant="primary"
            items={stats.genreDistribution.map((genre) => ({
              key: genre.name,
              label: genre.name,
              count: genre.count,
              pct: genre.pct,
            }))}
            isLoading={stats.genresLoading}
            loadingLabel="Loading genres…"
          />
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Add titles to your watchlist and your status and genre breakdown will show up here.
        </p>
      )}

      <RecentActivity activity={stats.recentActivity} />
    </div>
  );
}
