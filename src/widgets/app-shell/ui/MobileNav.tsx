import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/lib/tailwind";

import { NAV_ITEMS } from "../model/nav-items";

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-[var(--glass-blur)] md:hidden"
      style={{ background: "var(--glass-rail)", boxShadow: "var(--aura-md)" }}
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          className="flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-[0.6875rem] font-semibold text-muted-foreground transition-colors"
          activeProps={{
            className: cn("text-foreground [&_.nav-dot]:scale-100"),
          }}
        >
          <span className="relative flex flex-col items-center gap-0.5">
            <Icon className="size-5" />
            {label}
            <span
              className="nav-dot absolute -bottom-1.5 size-[5px] scale-0 rounded-full bg-secondary transition-transform duration-[var(--dur-base)] ease-[var(--ease-emphasis)]"
              style={{ boxShadow: "var(--glow-secondary)" }}
            />
          </span>
        </Link>
      ))}
    </nav>
  );
}
