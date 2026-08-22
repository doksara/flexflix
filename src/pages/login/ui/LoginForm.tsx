import { useState } from "react";
import type { FormEvent } from "react";
import { Lock, User } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useLoginMutation } from "../model/login";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loginMutation = useLoginMutation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  }

  return (
    <form className="mt-8 flex flex-col gap-4.5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="username"
          className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-variant)] uppercase"
        >
          Username
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-4 size-[19px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="username"
            autoComplete="username"
            placeholder="mara.vance"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="pl-11"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="password"
          className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-variant)] uppercase"
        >
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-4 size-[19px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="pl-11"
            required
          />
        </div>
        <button
          type="button"
          onClick={() => setPasswordVisible((visible) => !visible)}
          className="-mt-1 self-end text-[0.6875rem] font-semibold tracking-[0.04em] text-[var(--on-surface-muted)] uppercase hover:text-secondary"
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
