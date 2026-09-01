import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { deleteSession, useSessionStore } from "@/shared/auth";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

import { useProfileStats } from "../model/profile-stats";
import { GenreDistribution } from "./GenreDistribution";
import { RecentActivity } from "./RecentActivity";
import { StatsOverview } from "./StatsOverview";
import { StatusBreakdown } from "./StatusBreakdown";

export function ProfilePage() {
  const navigate = useNavigate();
  const username = useSessionStore((state) => state.username);
  const sessionId = useSessionStore((state) => state.sessionId);
  const clearSession = useSessionStore((state) => state.clearSession);
  const stats = useProfileStats();

  async function handleLogout() {
    if (sessionId) {
      await deleteSession(sessionId).catch(() => {});
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
          <StatusBreakdown statuses={stats.statusBreakdown} />
          <GenreDistribution genres={stats.genreDistribution} />
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
