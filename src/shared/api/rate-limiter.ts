const MAX_TOKENS = 35;
const REFILL_PER_SECOND = 3.5;

let tokens = MAX_TOKENS;
let lastRefill = Date.now();

function refill() {
  const now = Date.now();
  const elapsedSeconds = (now - lastRefill) / 1000;
  tokens = Math.min(MAX_TOKENS, tokens + elapsedSeconds * REFILL_PER_SECOND);
  lastRefill = now;
}

export async function acquireToken(): Promise<void> {
  refill();
  if (tokens >= 1) {
    tokens -= 1;
    return;
  }
  const waitMs = ((1 - tokens) / REFILL_PER_SECOND) * 1000;
  await new Promise((resolve) => setTimeout(resolve, waitMs));
  return acquireToken();
}
