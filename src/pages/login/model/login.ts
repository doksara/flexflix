import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { TmdbApiError } from "@/shared/api";
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
    onError: (error) => {
      if (error instanceof TmdbApiError) {
        if (error.status === 429) {
          toast.error("Too many requests. Please wait a moment and try again.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Unable to reach TMDB. Check your connection and try again.");
      }
    },
  });
}
