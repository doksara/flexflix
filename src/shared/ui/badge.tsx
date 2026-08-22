import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/shared/lib/tailwind"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-[0.34em] overflow-hidden rounded-sm border border-transparent px-[0.7em] py-[0.4em] text-[0.6875rem] leading-none font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-[1.05em]!",
  {
    variants: {
      variant: {
        default: "bg-[rgba(163,166,255,0.16)] text-primary",
        secondary: "bg-[rgba(253,147,61,0.16)] text-secondary",
        destructive: "bg-[rgba(255,90,118,0.16)] text-destructive focus-visible:ring-destructive/20",
        outline: "bg-muted text-muted-foreground [a]:hover:bg-accent",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted",
        link: "rounded-none bg-transparent p-0 text-primary normal-case underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
