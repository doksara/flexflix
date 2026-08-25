import * as React from "react"

import { cn } from "@/shared/lib/tailwind"

interface TagProps extends React.ComponentProps<"button"> {
  selected?: boolean
}

function Tag({ className, selected = false, ...props }: TagProps) {
  return (
    <button
      type="button"
      data-slot="tag"
      data-selected={selected}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-[0.45em] rounded-full border-0 bg-[var(--surface-container-highest)] px-[0.85rem] py-[0.46rem] font-sans text-[0.8125rem] font-medium whitespace-nowrap text-[var(--on-surface-variant)] transition-[background,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-soft)] hover:bg-[var(--surface-bright)] hover:text-foreground",
        selected &&
          "text-primary shadow-[inset_0_0_0_1px_rgba(163,166,255,0.4),var(--glow-primary)] hover:bg-[var(--surface-container-highest)] hover:text-primary",
        className
      )}
      {...props}
    />
  )
}

export { Tag }
