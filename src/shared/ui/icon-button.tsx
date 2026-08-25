import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/tailwind"

const iconButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center border-0 text-[var(--on-surface-variant)] transition-[transform,background,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-soft)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-94 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[2px]",
  {
    variants: {
      variant: {
        ghost: "bg-transparent hover:bg-muted hover:text-foreground",
        primary: "bg-primary text-[var(--on-primary)] hover:shadow-[var(--glow-primary)]",
        secondary: "bg-secondary text-[var(--on-secondary)] hover:shadow-[var(--glow-secondary)]",
        tertiary: "bg-[var(--tertiary)] text-[var(--on-tertiary)] hover:shadow-[var(--glow-tertiary)]",
        danger: "bg-destructive text-[var(--on-error)]",
        glass:
          "bg-[var(--glass-bar)] text-foreground backdrop-blur-[var(--glass-blur)] hover:bg-muted",
      },
      size: {
        sm: "size-9 [&_svg]:size-[18px]",
        md: "size-11 [&_svg]:size-[21px]",
        lg: "size-[52px] [&_svg]:size-6",
      },
      shape: {
        round: "rounded-full",
        square: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      shape: "round",
    },
  }
)

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>
  "aria-label": string
}

function IconButton({ className, variant, size, shape, icon: Icon, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      data-slot="icon-button"
      className={cn(iconButtonVariants({ variant, size, shape }), className)}
      {...props}
    >
      <Icon />
    </button>
  )
}

export { IconButton, iconButtonVariants }
