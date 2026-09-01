import { ProgressBar } from "@/shared/ui/progress-bar";

import type { StatusBreakdownItem } from "../model/profile-stats";

interface StatusBreakdownProps {
  statuses: StatusBreakdownItem[];
}

export function StatusBreakdown({ statuses }: StatusBreakdownProps) {
  const visible = statuses.filter((status) => status.count > 0);
  if (visible.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 font-heading text-[1.25rem] font-bold text-foreground">Status breakdown</h3>
      <div className="flex max-w-[520px] flex-col gap-3.5">
        {visible.map((status) => (
          <ProgressBar
            key={status.status}
            value={status.pct}
            variant="secondary"
            label={status.label}
            trailing={`${status.count}`}
          />
        ))}
      </div>
    </div>
  );
}
