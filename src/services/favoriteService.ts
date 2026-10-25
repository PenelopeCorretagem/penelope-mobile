import { authenticatedApiRequest } from "@shared/infrastructure/apiClient";
import { API_ROUTES } from "@constant/apiRoutes";

type FavoriteResponse = {
  advertisementId: number;
};

export async function getFavoriteIds() {
  const favorites = await authenticatedApiRequest<FavoriteResponse[]>(API_ROUTES.users.favorites);
  return favorites.map((favorite) => favorite.advertisementId);
}

export function addFavorite(advertisementId: number) {
  return authenticatedApiRequest<void>(API_ROUTES.users.favoriteByAdvertisementId(advertisementId), { method: "PUT" });
}

export function removeFavorite(advertisementId: number) {
  return authenticatedApiRequest<void>(API_ROUTES.users.favoriteByAdvertisementId(advertisementId), { method: "DELETE" });
}