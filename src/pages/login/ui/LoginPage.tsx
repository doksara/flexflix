import { LoginForm } from "./LoginForm";

const COLLAGE_TILES = [
  { gradient: "linear-gradient(160deg,#2a3466,#111a3a)" },
  { gradient: "linear-gradient(160deg,#6b3a5e,#241832)", marginTop: 44 },
  { gradient: "linear-gradient(160deg,#1d4c52,#0f2430)" },
  { gradient: "linear-gradient(160deg,#4a3a72,#181233)", marginTop: 26 },
  { gradient: "linear-gradient(160deg,#7a4630,#2a1710)", marginTop: -18 },
  { gradient: "linear-gradient(160deg,#22406e,#0e1a33)" },
  { gradient: "linear-gradient(160deg,#5c2f45,#1e1024)", marginTop: 38 },
  { gradient: "linear-gradient(160deg,#2f5d54,#122622)" },
  { gradient: "linear-gradient(160deg,#3b3f7a,#141634)", marginTop: 12 },
  { gradient: "linear-gradient(160deg,#6d5327,#241a0d)" },
  { gradient: "linear-gradient(160deg,#243a5e,#0d1628)", marginTop: 52 },
  { gradient: "linear-gradient(160deg,#4d2b56,#1a0f22)" },
];

export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-background md:grid-cols-[1.15fr_1fr]">
      <div className="relative hidden overflow-hidden bg-[var(--surface-container-low)] md:block">
        <div
          className="absolute top-[-8%] left-[-6%] grid grid-cols-4 gap-[18px]"
          style={{ transform: "rotate(-8deg)", width: "118%", height: "116%" }}
        >
          {COLLAGE_TILES.map((tile, index) => (
            <div
              key={index}
              className="rounded-[14px]"
              style={{ background: tile.gradient, marginTop: tile.marginTop }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(6,14,32,.45) 0%, rgba(6,14,32,.78) 62%, var(--surface) 100%)",
          }}
        />
        <div className="absolute right-[70px] bottom-14 left-12 flex flex-col gap-3">
          <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-secondary uppercase">
            Your shelf
          </span>
          <span className="max-w-[22ch] font-heading text-[1.9rem] leading-[1.3] font-bold tracking-[-0.01em] text-white">
            Everything you&apos;re watching, on one wall.
          </span>
        </div>
      </div>

      <div className="flex min-h-svh flex-col justify-center gap-2 overflow-y-auto px-6 py-14 sm:px-[clamp(3rem,7vw,6.875rem)]">
        <div className="mb-9 flex items-baseline gap-0.5 font-heading text-2xl font-extrabold tracking-tight text-foreground">
          Flexflix
          <span
            className="mb-[5px] ml-1 size-[9px] self-end rounded-full bg-secondary"
            style={{ boxShadow: "var(--glow-secondary)" }}
          />
        </div>
        <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-[var(--on-surface-muted)] uppercase">
          Sign in
        </span>
        <h1 className="mt-0 mb-1.5 font-heading text-[2.75rem] leading-[1.1] font-bold text-foreground">
          Welcome back.
        </h1>
        <p className="m-0 max-w-[40ch] text-[1.0625rem] leading-[1.6] text-[var(--on-surface-variant)]">
          Pick up your watchlist and episode progress where you left off.
        </p>

        <LoginForm />

        <div className="mt-[30px] text-[0.6875rem] tracking-[0.02em] text-[var(--on-surface-muted)]">
          Your credentials stay in this browser. Nothing is sent anywhere.
        </div>
      </div>
    </div>
  );
}
