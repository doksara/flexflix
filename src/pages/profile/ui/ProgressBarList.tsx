import { ProgressBar } from "@/shared/ui/progress-bar";
import { Skeleton } from "@/shared/ui/skeleton";

interface ProgressBarListItem {
  key: string;
  label: string;
  count: number;
  pct: number;
}

interface ProgressBarListProps {
  title: string;
  variant: "primary" | "secondary";
  items: ProgressBarListItem[];
  isLoading?: boolean;
  loadingLabel?: string;
}

export function ProgressBarList({
  title,
  variant,
  items,
  isLoading = false,
  loadingLabel = "Loading…",
}: ProgressBarListProps) {
  if (!isLoading && items.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 font-heading text-[1.25rem] font-bold text-foreground">{title}</h3>
      {isLoading ? (
        <div className="flex max-w-[520px] flex-col gap-3.5" role="status" aria-label={loadingLabel}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-1 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex max-w-[520px] flex-col gap-3.5">
          {items.map((item) => (
            <ProgressBar key={item.key} value={item.pct} variant={variant} label={item.label} trailing={`${item.count}`} />
          ))}
        </div>
      )}
    </div>
  );
}
