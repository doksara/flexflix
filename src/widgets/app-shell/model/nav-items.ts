import { Compass, ListVideo, User } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Discover", icon: Compass },
  { to: "/watchlist", label: "Watchlist", icon: ListVideo },
  { to: "/profile", label: "Profile", icon: User },
] as const;
