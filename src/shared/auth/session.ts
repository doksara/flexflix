import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      accountId: null,
      username: null,
      setSession: ({ sessionId, accountId, username }) =>
        set({ sessionId, accountId, username }),
      clearSession: () =>
        set({ sessionId: null, accountId: null, username: null }),
      isAuthenticated: () => get().sessionId !== null,
    }),
    { name: "flexflix:session" },
  ),
);

export function waitForSessionHydration(): Promise<void> {
  if (useSessionStore.persist.hasHydrated()) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const unsubscribe = useSessionStore.persist.onFinishHydration(() => {
      unsubscribe();
      resolve();
    });
  });
}
