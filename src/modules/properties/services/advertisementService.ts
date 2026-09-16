import type { Advertisement } from '@properties/types/advertisement'
import { ApiRequestError, apiRequest } from '@shared/infrastructure/apiClient'
import { toAdvertisement } from '@shared/utils/advertisementNormalizer'

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
  return apiRequest<unknown[]>(`/v1/advertisements?${searchParams.toString()}`)
}

export async function getAdvertisementById(id: number): Promise<Advertisement | undefined> {
  try {
    return toAdvertisement(await apiRequest(`/v1/advertisements/${id}`))
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) return undefined

    throw error
  }
}