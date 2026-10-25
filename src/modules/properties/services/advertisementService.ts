import type { Advertisement } from '@properties/types/advertisement'
import { ApiRequestError, apiRequest } from '@shared/infrastructure/apiClient'
import { toAdvertisement } from '@shared/utils/advertisementNormalizer'
import { API_ROUTES } from '@constant/apiRoutes'

export type AdvertisementQuery = {
  type: string
  active: boolean
}

export async function getAllAdvertisements(
  query: AdvertisementQuery,
): Promise<unknown[]> {
  const searchParams = new URLSearchParams({
    active: String(query.active),
    type: query.type,
  })
  return apiRequest<unknown[]>(`${API_ROUTES.advertisements.collection}?${searchParams.toString()}`)
}

export async function getAdvertisementById(id: number): Promise<Advertisement | undefined> {
  try {
    return toAdvertisement(await apiRequest(API_ROUTES.advertisements.byId(id)))
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) return undefined

    throw error
  }
}