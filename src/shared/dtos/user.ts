export type UserDto = {
  id: number
  name: string
  email: string
  password: string
  birthDate?: string | null
  profileImage?: string | null
  active: boolean
  createdAt: string
  passwordResetToken?: string | null
  tokenExpirationDate?: string | null
}

export type UserSummaryDto = Pick<UserDto, 'id' | 'name' | 'email' | 'active'>
