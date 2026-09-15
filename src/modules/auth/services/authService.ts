import { apiRequest } from "@shared/infrastructure/apiClient";

type LoginResponse = {
  token: string;
};

type ValidateAccessTokenResponse = {
  email: string | null;
};

export async function authenticate(email: string, password: string) {
  const response = await apiRequest<LoginResponse>("/v1/auth/login", {
    method: "POST",
    body: { email, password },
  });

  return response.token;
}

export async function validateAccessToken(token: string) {
  const response = await apiRequest<ValidateAccessTokenResponse>("/v1/auth/validate-access-token", {
    method: "POST",
    body: { token },
  });

  return response.email !== null;
}