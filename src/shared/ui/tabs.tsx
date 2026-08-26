import * as React from "react"

import { cn } from "@/shared/lib/tailwind"

export interface TabItem {
  id: string
  label: string
  icon?: React.ElementType<React.SVGProps<SVGSVGElement>>
  count?: number
}

interface TabsProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
}

function Tabs({ items, value, onChange, className, ...props }: TabsProps) {
  return (
    <div role="tablist" className={cn("flex items-stretch gap-1.5", className)} {...props}>
      {items.map((item) => {
        const isActive = value === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent px-[0.9rem] pt-[0.7rem] pb-4 font-heading text-[0.875rem] font-semibold whitespace-nowrap text-[var(--on-surface-muted)] transition-colors duration-[var(--dur-base)] ease-[var(--ease-soft)] hover:text-[var(--on-surface-variant)]",
              isActive && "text-foreground",
            )}
          >
            {Icon && <Icon className="size-[18px] stroke-[2px]" />}
            {item.label}
            {item.count != null && (
              <span className="font-sans text-[0.6875rem] font-semibold text-[var(--on-surface-muted)]">
                {item.count}
              </span>
            )}
            <span
              className={cn(
                "absolute bottom-[0.45rem] left-1/2 h-[3px] w-[60%] -translate-x-1/2 scale-x-0 rounded-full bg-secondary transition-transform duration-[var(--dur-base)] ease-[var(--ease-emphasis)]",
                isActive && "scale-x-100",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
