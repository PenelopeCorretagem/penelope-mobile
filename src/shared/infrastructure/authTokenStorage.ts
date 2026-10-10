import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "penelope.access-token";
let sessionExpiredHandler: (() => void) | null = null;

export function getAccessToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  }

  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export function saveAccessToken(token: string) {
  if (Platform.OS === "web") {
    return AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  return SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
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