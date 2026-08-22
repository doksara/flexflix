import { cn } from "@/shared/lib/tailwind";
import { Skeleton } from "@/shared/ui/skeleton";

interface MediaCardSkeletonProps {
  className?: string;
}

export function MediaCardSkeleton({ className }: MediaCardSkeletonProps) {
  return <Skeleton className={cn("aspect-2/3 w-full rounded-xl", className)} />;
}
