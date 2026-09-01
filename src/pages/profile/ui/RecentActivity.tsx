import type { ActivityItem } from "../model/profile-stats";

interface RecentActivityProps {
  activity: ActivityItem[];
}

export function RecentActivity({ activity }: RecentActivityProps) {
  if (activity.length === 0) {
    return (
      <div>
        <h3 className="mb-4 font-heading text-[1.25rem] font-bold text-foreground">Recent activity</h3>
        <p className="text-sm text-muted-foreground">
          Nothing yet — actions you take show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 font-heading text-[1.25rem] font-bold text-foreground">Recent activity</h3>
      <div className="flex flex-col gap-3">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-[var(--surface-container-low)] px-5 py-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)]">
                <Icon className="size-[19px]" />
              </div>
              <div className="flex-1 text-[0.9375rem] text-foreground">{item.text}</div>
              <div className="text-[0.6875rem] whitespace-nowrap text-[var(--on-surface-muted)]">
                {item.timeLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
