import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function DetailBackLink() {
  return (
    <Link
      to="/"
      className="inline-flex w-fit items-center gap-1.5 rounded-full py-2 pr-4 pl-3 text-sm font-semibold text-foreground backdrop-blur-[var(--glass-blur)]"
      style={{ background: "var(--glass-bar)" }}
    >
      <ChevronLeft className="size-4" />
      Browse
    </Link>
  );
}
