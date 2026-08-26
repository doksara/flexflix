import { Bookmark, CircleCheck, Library } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: number;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-[var(--surface-container)] p-[26px_28px]">
      <span className="mb-1.5 flex size-10 items-center justify-center rounded-md bg-[var(--surface-container-highest)] text-primary">
        {icon}
      </span>
      <span className="font-heading text-[2.2rem] leading-none font-extrabold tracking-[-0.02em] text-foreground">
        {value}
      </span>
      <span className="text-[0.9375rem] text-[var(--on-surface-muted)]">{label}</span>
    </div>
  );
}

interface StatsBarProps {
  totalTitles: number;
  watchLaterCount: number;
  episodesWatched: number;
}

export function StatsBar({ totalTitles, watchLaterCount, episodesWatched }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-[var(--card-gap)] max-sm:grid-cols-1">
      <StatCard icon={<Library className="size-5" />} value={totalTitles} label="Titles in your library" />
      <StatCard icon={<Bookmark className="size-5" />} value={watchLaterCount} label="Saved for later" />
      <StatCard icon={<CircleCheck className="size-5" />} value={episodesWatched} label="Episodes watched" />
    </div>
  );
}
