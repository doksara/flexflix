import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { deleteSession, useSessionStore } from "@/shared/auth";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

export function Header() {
  const navigate = useNavigate();
  const username = useSessionStore((state) => state.username);
  const sessionId = useSessionStore((state) => state.sessionId);
  const clearSession = useSessionStore((state) => state.clearSession);

  async function handleLogout() {
    if (sessionId) {
      await deleteSession(sessionId).catch(() => {});
    }
    clearSession();
    navigate({ to: "/login" });
  }

  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="font-heading text-lg font-semibold md:hidden">
        Flexflix
      </span>
      <div className="ml-auto flex items-center gap-3">
        {username && (
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{username}</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
