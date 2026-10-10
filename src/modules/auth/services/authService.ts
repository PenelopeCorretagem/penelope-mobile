import { apiRequest } from "@shared/infrastructure/apiClient";
import { API_ROUTES } from "@constant/apiRoutes";

type LoginResponse = {
  token: string;
};

type ValidateAccessTokenResponse = {
  email: string | null;
};

type ForgotPasswordResponse = {
  message: string;
};

export type RegisterAccountRequest = {
  name: string;
  birthDate: string;
  email: string;
  password: string;
};

export type RegisterAccountResponse = {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  accessLevel: string;
};

export async function authenticate(email: string, password: string) {
  const response = await apiRequest<LoginResponse>(API_ROUTES.auth.login, {
    method: "POST",
    body: { email, password },
  });

  return response.token;
}

export async function requestPasswordReset(email: string) {
  const response = await apiRequest<ForgotPasswordResponse>(API_ROUTES.auth.forgotPassword, {
    method: "POST",
    body: { email },
  });

  return response.message;
}

export async function registerAccount(request: RegisterAccountRequest) {
  return apiRequest<RegisterAccountResponse>(API_ROUTES.auth.register, {
    method: "POST",
    body: request,
  });
}

export async function validateAccessToken(token: string) {
  const response = await apiRequest<ValidateAccessTokenResponse>(API_ROUTES.auth.validateAccessToken, {
    method: "POST",
    body: { token },
  });

  return response.email !== null;
}