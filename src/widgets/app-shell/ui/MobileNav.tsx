import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/lib/tailwind";

import { NAV_ITEMS } from "../model/nav-items";

export function MobileNav() {
  return (
    <nav className="flex items-center justify-around border-t p-2 md:hidden">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          className="flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-muted-foreground"
          activeProps={{
            className: cn("text-foreground"),
          }}
        >
          <Icon className="size-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
