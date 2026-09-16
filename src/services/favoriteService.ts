import { authenticatedApiRequest } from "@shared/infrastructure/apiClient";

type FavoriteResponse = {
  advertisementId: number;
};

export async function getFavoriteIds() {
  const favorites = await authenticatedApiRequest<FavoriteResponse[]>("/v1/users/me/favorites");
  return favorites.map((favorite) => favorite.advertisementId);
}

export function addFavorite(advertisementId: number) {
  return authenticatedApiRequest<void>(`/v1/users/me/favorites/${advertisementId}`, { method: "PUT" });
}

export function removeFavorite(advertisementId: number) {
  return authenticatedApiRequest<void>(`/v1/users/me/favorites/${advertisementId}`, { method: "DELETE" });
}