import { tmdbFetch } from "@/shared/api";

interface TmdbRequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface TmdbSessionResponse {
  success: boolean;
  session_id: string;
}

interface TmdbAccountDetails {
  id: number;
  username: string;
}

async function createRequestToken(): Promise<string> {
  const data = await tmdbFetch<TmdbRequestTokenResponse>(
    "/authentication/token/new",
  );
  return data.request_token;
}

async function validateRequestTokenWithLogin(params: {
  username: string;
  password: string;
  requestToken: string;
}): Promise<string> {
  const data = await tmdbFetch<TmdbRequestTokenResponse>(
    "/authentication/token/validate_with_login",
    {
      method: "POST",
      body: {
        username: params.username,
        password: params.password,
        request_token: params.requestToken,
      },
    },
  );
  return data.request_token;
}

async function createSession(requestToken: string): Promise<string> {
  const data = await tmdbFetch<TmdbSessionResponse>(
    "/authentication/session/new",
    {
      method: "POST",
      body: { request_token: requestToken },
    },
  );
  return data.session_id;
}

export async function fetchAccountDetails(
  sessionId: string,
): Promise<TmdbAccountDetails> {
  return tmdbFetch<TmdbAccountDetails>("/account", {
    params: { session_id: sessionId },
  });
}

export async function deleteSession(sessionId: string): Promise<void> {
  await tmdbFetch<{ success: boolean }>("/authentication/session", {
    method: "DELETE",
    body: { session_id: sessionId },
  });
}

export async function loginWithTmdb(params: {
  username: string;
  password: string;
}): Promise<{ sessionId: string; accountId: number; username: string }> {
  const requestToken = await createRequestToken();
  const validatedToken = await validateRequestTokenWithLogin({
    ...params,
    requestToken,
  });
  const sessionId = await createSession(validatedToken);
  const account = await fetchAccountDetails(sessionId);

  return {
    sessionId,
    accountId: account.id,
    username: account.username,
  };
}
