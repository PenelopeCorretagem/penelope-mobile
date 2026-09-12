import { Platform } from 'react-native'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { Advertisement } from '@dtos/Advertisement'
import { toAdvertisementList } from '@shared/utils/advertisementNormalizer'

export type AdvertisementQuery = {
  type: string
  active: boolean
}

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
  ?? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.0.104:3001')

export async function getAllAdvertisements(
  query: AdvertisementQuery,
): Promise<unknown[]> {
  const searchParams = new URLSearchParams({
    active: String(query.active),
    type: query.type,
  })
  const response = await fetch(`${apiBaseUrl}/advertisements?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Não foi possível carregar imóveis: ${response.status}`)
  }

  return response.json() as Promise<unknown[]>
}

export async function getAdvertisementById(id: number): Promise<Advertisement | undefined> {
  const responses = await Promise.all(
    Object.values(PROPERTY_TYPES).map(({ apiValue }) => (
      getAllAdvertisements({ type: apiValue, active: true })
    )),
  )
  const advertisements = responses.flatMap(toAdvertisementList)

  return advertisements.find((advertisement) => advertisement.id === id)
}