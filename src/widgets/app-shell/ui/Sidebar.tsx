import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/lib/tailwind";

import { NAV_ITEMS } from "../model/nav-items";

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r p-4 md:flex">
      <span className="mb-4 px-2 text-lg font-heading font-semibold">
        Flexflix
      </span>
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          activeProps={{
            className: cn("bg-muted text-foreground"),
          }}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </aside>
  );
}
