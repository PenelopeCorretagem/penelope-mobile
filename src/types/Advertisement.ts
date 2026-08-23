export type EstateType = {
  key: string
  friendlyName?: string
}

export type Estate = {
  title?: string
  subtitle?: string
  description?: string
  type: EstateType
  coverImageUrl?: string
}

export type Advertisement = {
  id: number
  featured?: boolean
  createdAt?: string
  estate: Estate
}