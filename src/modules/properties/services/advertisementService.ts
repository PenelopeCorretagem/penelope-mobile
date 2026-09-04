export type AdvertisementQuery = {
  type: string
  active: boolean
}

const apiBaseUrl = 'http://192.168.0.172:3001'

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