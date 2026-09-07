import { Platform } from 'react-native'
import type { UserDto } from '@shared/dtos/user'
import { DEFAULT_USER_PROFILE, type UserProfile } from '@settings/submodules/acount/pages/Account/ProfileModel'

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
  ?? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.18.45:3001')

function toProfile(user: UserDto): UserProfile {
  return {
    name: user.name,
    email: user.email,
    birthDate: user.birthDate ?? '',
    profileImage: user.profileImage ?? null,
  }
}

async function assertResponse(response: Response, action: string): Promise<void> {
  if (!response.ok) {
    throw new Error(`Não foi possível ${action}: ${response.status}`)
  }
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await fetch(`${apiBaseUrl}/users/1`)
  await assertResponse(response, 'carregar o perfil')
  return toProfile(await response.json() as UserDto)
}

export async function updateUserProfile(profile: UserProfile): Promise<UserProfile> {
  const response = await fetch(`${apiBaseUrl}/users/1`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: profile.name,
      email: profile.email,
      birthDate: profile.birthDate,
      profileImage: profile.profileImage,
    }),
  })
  await assertResponse(response, 'salvar o perfil')
  return toProfile(await response.json() as UserDto)
}

export { DEFAULT_USER_PROFILE }