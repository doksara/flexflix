import type { StatCard } from "../model/profile-stats";

interface StatsOverviewProps {
  statCards: StatCard[];
}

export function StatsOverview({ statCards }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {statCards.map((stat) => (
        <div key={stat.label} className="rounded-[20px] bg-[var(--surface-container-high)] p-[22px]">
          <div className="font-heading text-[2rem] font-extrabold whitespace-nowrap text-foreground">
            {stat.value}
          </div>
          <div className="mt-1 text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-variant)] uppercase">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
