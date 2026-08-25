import { Skeleton } from "@/shared/ui/skeleton";

export function DetailPageLoading() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <Skeleton className="h-9 w-24 rounded-full" />
      <Skeleton className="aspect-video w-full rounded-3xl sm:aspect-21/9" />
    </div>
  );
}

export function DetailPageError() {
  return (
    <div className="py-24 text-center text-muted-foreground">
      Something went wrong loading this title.
    </div>
  );
}
