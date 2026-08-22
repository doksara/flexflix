import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { useSessionStore } from "@/shared/auth";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/tailwind";

import { NAV_ITEMS } from "../model/nav-items";

export function Header() {
  const username = useSessionStore((state) => state.username);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-6 px-4 py-3.5 backdrop-blur-[var(--glass-blur)] sm:px-6 md:px-10"
      style={{ background: "var(--glass-bar)" }}
    >
      <Link
        to="/"
        className="flex items-baseline gap-0.5 font-heading text-xl font-extrabold tracking-tight text-foreground"
      >
        Flexflix
        <span
          className="mb-[4px] ml-1 size-2 self-end rounded-full bg-secondary"
          style={{ boxShadow: "var(--glow-secondary)" }}
        />
      </Link>

      <nav
        role="tablist"
        className="absolute left-1/2 hidden -translate-x-1/2 items-stretch gap-1.5 md:flex"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            role="tab"
            activeOptions={{ exact: to === "/" }}
            className="relative inline-flex items-center gap-2 px-3.5 pt-2.5 pb-4 font-heading text-sm font-semibold text-muted-foreground transition-colors hover:text-[var(--on-surface-variant)] [&_.tab-ind]:scale-x-0"
            activeProps={{
              className: cn("text-foreground [&_.tab-ind]:scale-x-100"),
            }}
          >
            <Icon className="size-[18px]" strokeWidth={2} />
            {label}
            <span className="tab-ind absolute bottom-[7px] left-1/2 h-[3px] w-[60%] -translate-x-1/2 rounded-full bg-secondary transition-transform duration-[var(--dur-base)] ease-[var(--ease-emphasis)]" />
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3.5">
        <Button variant="ghost" size="icon" asChild aria-label="Search">
          <Link to="/">
            <Search className="size-4" />
          </Link>
        </Button>
        <Link to="/profile">
          <Avatar className="size-12">
            <AvatarFallback>{username ? username.slice(0, 2).toUpperCase() : "?"}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
