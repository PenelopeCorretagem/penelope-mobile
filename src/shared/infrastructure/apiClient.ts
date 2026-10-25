import { getAccessToken, invalidateAccessToken } from "@shared/infrastructure/authTokenStorage";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

function resolveApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (!configuredUrl) {
    throw new Error("Configure EXPO_PUBLIC_API_BASE_URL no ambiente do Expo.");
  }

  const baseUrl = configuredUrl.replace(/\/+$/, "");
  if (!baseUrl.endsWith("/api")) {
    throw new Error("EXPO_PUBLIC_API_BASE_URL deve incluir o context path /api.");
  }

  return baseUrl;
}

async function resolveErrorMessage(response: Response) {
  const fallbackMessage = "Nao foi possivel concluir a requisicao.";

  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function apiRequest<T>(
  path: string,
  { body, token, ...options }: ApiRequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${resolveApiBaseUrl()}${path}`, {
    ...options,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers,
  });

  if (!response.ok) {
    throw new ApiRequestError(await resolveErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function authenticatedApiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const token = await getAccessToken();

  if (!token) {
    throw new ApiRequestError("Sua sessao expirou. Entre novamente.", 401);
  }

  try {
    return await apiRequest<T>(path, { ...options, token });
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      await invalidateAccessToken();
    }

    throw error;
  }
}