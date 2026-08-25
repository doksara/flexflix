import { cn } from "@/shared/lib/tailwind"

const fillColor = {
  primary: "bg-primary shadow-[var(--glow-primary)]",
  secondary: "bg-secondary shadow-[var(--glow-secondary)]",
  tertiary: "bg-[var(--tertiary)] shadow-[var(--glow-tertiary)]",
} as const

interface ProgressBarProps {
  value: number
  variant?: keyof typeof fillColor
  thick?: boolean
  dot?: boolean
  label?: string
  trailing?: string
  className?: string
}

export function ProgressBar({
  value,
  variant = "secondary",
  thick = false,
  dot = false,
  label,
  trailing,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value))

  return (
    <div className={cn("group/progress flex w-full flex-col gap-2", className)}>
      {(label || trailing) && (
        <div className="flex justify-between font-sans text-[0.6875rem] font-semibold tracking-[0.06em] text-[var(--on-surface-muted)] uppercase">
          <span>{label}</span>
          <span>{trailing}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "relative w-full overflow-visible rounded-full bg-[var(--surface-variant)]",
          thick ? "h-1.5" : "h-1"
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-[var(--dur-slow)] ease-[var(--ease-soft)]",
            fillColor[variant]
          )}
          style={{ width: `${pct}%` }}
        />
        {dot && (
          <div
            className={cn(
              "absolute top-1/2 left-0 size-3 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[var(--dur-base)] ease-[var(--ease-soft)] group-hover/progress:scale-100",
              fillColor[variant]
            )}
            style={{ left: `${pct}%`, marginLeft: "-6px" }}
          />
        )}
      </div>
    </div>
  )
}
