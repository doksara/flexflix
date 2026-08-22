import * as React from "react"

import { cn } from "@/shared/lib/tailwind"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-full border-0 bg-[var(--surface-container-high)] px-4 text-sm text-foreground shadow-[inset_0_0_0_1px_var(--ghost-border)] transition-[background,box-shadow] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:bg-[var(--surface-bright)] focus-visible:shadow-[inset_0_0_0_1px_var(--ghost-border-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:shadow-[inset_0_0_0_1px_var(--destructive)] aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
