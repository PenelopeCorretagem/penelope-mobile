import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "penelope.access-token";
let sessionExpiredHandler: (() => void) | null = null;

export function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export function saveAccessToken(token: string) {
  return SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  return SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export function setSessionExpiredHandler(handler: (() => void) | null) {
  sessionExpiredHandler = handler;
}

export async function invalidateAccessToken() {
  await clearAccessToken();
  sessionExpiredHandler?.();
}