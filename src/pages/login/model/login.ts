import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { loginWithTmdb, useSessionStore } from "@/shared/auth";

export function useLoginMutation() {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);

  return useMutation({
    mutationFn: loginWithTmdb,
    onSuccess: (session) => {
      setSession(session);
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Invalid TMDB username or password.");
    },
  });
}
