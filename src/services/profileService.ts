import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'
import { saveAccessToken } from '@shared/infrastructure/authTokenStorage'
import { API_ROUTES } from '@constant/apiRoutes'
import { File } from 'expo-file-system'
import { DEFAULT_USER_PROFILE, type UserProfile } from '@settings/submodules/acount/pages/Account/ProfileModel'

type UserProfileResponse = {
  name: string
  email: string
  birthDate: string | null
  profileImage: string | null
}

type UpdateUserProfileResponse = {
  profile: UserProfileResponse
  token: string | null
}

function toDisplayDate(value: string | null) {
  if (!value) return ''

  const [year, month, day] = value.split('-')
  return year && month && day ? `${day}/${month}/${year}` : value
}

function toApiDate(value: string) {
  if (!value) return null

  const [day, month, year] = value.split('/')
  return day && month && year ? `${year}-${month}-${day}` : value
}

function toProfile(user: UserProfileResponse): UserProfile {
  return {
    name: user.name,
    email: user.email,
    birthDate: toDisplayDate(user.birthDate),
    profileImage: user.profileImage,
  }
}

async function toProfileImageDataUri(uri: string | null) {
  if (!uri || uri.startsWith('data:') || uri.startsWith('http')) return uri

  const file = new File(uri)
  const base64 = await file.base64()
  const extension = file.extension.toLowerCase()
  const mimeType = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg'
  return `data:${mimeType};base64,${base64}`
}

export async function getUserProfile(): Promise<UserProfile> {
  return toProfile(await authenticatedApiRequest<UserProfileResponse>(API_ROUTES.users.me))
}

export async function updateUserProfile(profile: UserProfile): Promise<UserProfile> {
  const profileImage = await toProfileImageDataUri(profile.profileImage)
  const response = await authenticatedApiRequest<UpdateUserProfileResponse>(API_ROUTES.users.me, {
    method: 'PATCH',
    body: {
      name: profile.name,
      email: profile.email,
      birthDate: toApiDate(profile.birthDate),
      profileImage,
    },
  })

  if (response.token) await saveAccessToken(response.token)

  return toProfile(response.profile)
}

export { DEFAULT_USER_PROFILE }