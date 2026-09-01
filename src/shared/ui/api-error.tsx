import { TriangleAlert } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface ApiErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ApiError({
  title = "Something went wrong",
  description = "We couldn't load this. Please try again.",
  onRetry,
}: ApiErrorProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <TriangleAlert className="size-8 text-destructive" />
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
