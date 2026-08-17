import { create } from "zustand";
import { persist } from "zustand/middleware";

import { queryClient } from "@/shared/api";

interface SessionState {
  sessionId: string | null;
  accountId: number | null;
  username: string | null;
  setSession: (session: {
    sessionId: string;
    accountId: number;
    username: string;
  }) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

let resolveSessionHydration: () => void;
const sessionHydrationPromise = new Promise<void>((resolve) => {
  resolveSessionHydration = resolve;
});

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      accountId: null,
      username: null,
      setSession: ({ sessionId, accountId, username }) =>
        set({ sessionId, accountId, username }),
      clearSession: () => {
        set({ sessionId: null, accountId: null, username: null });
        queryClient.clear();
      },
      isAuthenticated: () => get().sessionId !== null,
    }),
    {
      name: "flexflix:session",
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error(
            "Failed to hydrate session from storage, clearing corrupted data.",
            error,
          );
          queueMicrotask(() => useSessionStore.persist.clearStorage());
        }
        resolveSessionHydration();
      },
    },
  ),
);

export function waitForSessionHydration(): Promise<void> {
  return sessionHydrationPromise;
}
