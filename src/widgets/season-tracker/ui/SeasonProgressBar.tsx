import { Progress } from "@/shared/ui/progress";

interface SeasonProgressBarProps {
  watched: number;
  total: number;
}

export function SeasonProgressBar({ watched, total }: SeasonProgressBarProps) {
  const value = total > 0 ? (watched / total) * 100 : 0;
  return <Progress value={value} className="h-1.5" />;
}
