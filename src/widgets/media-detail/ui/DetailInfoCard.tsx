import { cn } from "@/shared/lib/tailwind";

interface DetailInfoRow {
  label: string;
  value: string;
}

interface DetailInfoCardProps {
  rows: DetailInfoRow[];
  className?: string;
}

export function DetailInfoCard({ rows, className }: DetailInfoCardProps) {
  return (
    <div className={cn("w-full max-w-[360px] rounded-2xl bg-[var(--surface-container)] p-6", className)}>
      <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
        Details
      </span>
      <div className="mt-3 divide-y divide-[var(--surface-variant)]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3">
            <span className="text-[0.8125rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
              {row.label}
            </span>
            <span className="text-sm font-medium text-foreground">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
