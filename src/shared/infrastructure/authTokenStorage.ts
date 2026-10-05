import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "penelope.access-token";
let sessionExpiredHandler: (() => void) | null = null;

export function getAccessToken() {
  if (Platform.OS === "web") {
    return Promise.resolve(globalThis.sessionStorage.getItem(ACCESS_TOKEN_KEY));
  }

  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export function saveAccessToken(token: string) {
  if (Platform.OS === "web") {
    globalThis.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    return Promise.resolve();
  }

  return SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (Platform.OS === "web") {
    globalThis.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    return Promise.resolve();
  }

  return SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export function setSessionExpiredHandler(handler: (() => void) | null) {
  sessionExpiredHandler = handler;
}

export async function invalidateAccessToken() {
  await clearAccessToken();
  sessionExpiredHandler?.();
}