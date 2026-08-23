import { Advertisement } from '@dtos/Advertisement'

export type AdvertisementQuery = {
  type: string
  active: boolean
}

export async function getAllAdvertisements(
  _query: AdvertisementQuery,
): Promise<Advertisement[]> {
  return []
}