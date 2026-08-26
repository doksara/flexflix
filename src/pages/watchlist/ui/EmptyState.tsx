import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/button";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex flex-col gap-1.5">
        <span className="font-heading text-[1.25rem] font-bold text-foreground">{title}</span>
        <span className="text-[0.9375rem] text-[var(--on-surface-muted)]">{subtitle}</span>
      </div>
      <Button variant="secondary" size="sm" asChild>
        <Link to="/">Browse Discover</Link>
      </Button>
    </div>
  );
}
