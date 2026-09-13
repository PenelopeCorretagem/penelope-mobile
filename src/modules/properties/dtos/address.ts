export type AddressDto = {
  id: number
  street: string
  number: string
  neighborhood?: string | null
  city: string
  state: string
  region: string
  zipCode: string
  latitude?: number
  longitude?: number
  complement?: string | null
}
