import { Skeleton } from "@/shared/ui/skeleton";

interface MediaCardSkeletonProps {
  className?: string;
}

export function MediaCardSkeleton({ className }: MediaCardSkeletonProps) {
  return <Skeleton className={`aspect-2/3 w-full rounded-xl ${className ?? ""}`} />;
}
