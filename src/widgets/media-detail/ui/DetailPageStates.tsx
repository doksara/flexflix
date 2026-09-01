import { ApiError } from "@/shared/ui/api-error";
import { Skeleton } from "@/shared/ui/skeleton";

export function DetailPageLoading() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <Skeleton className="h-9 w-24 rounded-full" />
      <Skeleton className="aspect-video w-full rounded-3xl sm:aspect-21/9" />
    </div>
  );
}

interface DetailPageErrorProps {
  onRetry?: () => void;
}

export function DetailPageError({ onRetry }: DetailPageErrorProps) {
  return <ApiError title="Couldn't load this title" onRetry={onRetry} />;
}
