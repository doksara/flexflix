import type { ReactNode } from "react";

import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-[var(--content-max)] flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-10 md:pb-6">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
