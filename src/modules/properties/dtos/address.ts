export type AddressDto = {
  id: number
  street: string
  number: string
  neighborhood?: string | null
  city: string
  state: string
  region: string
  zipCode: string
  complement?: string | null
}
