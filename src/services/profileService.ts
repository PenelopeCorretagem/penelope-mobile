import { authenticatedApiRequest } from '@shared/infrastructure/apiClient'
import { saveAccessToken } from '@shared/infrastructure/authTokenStorage'
import { DEFAULT_USER_PROFILE, type UserProfile } from '@settings/submodules/acount/pages/Account/ProfileModel'

type UserProfileResponse = {
  name: string
  email: string
  birthDate: string | null
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
    profileImage: null,
  }
}

export async function getUserProfile(): Promise<UserProfile> {
  return toProfile(await authenticatedApiRequest<UserProfileResponse>('/v1/users/me'))
}

export async function updateUserProfile(profile: UserProfile): Promise<UserProfile> {
  const response = await authenticatedApiRequest<UpdateUserProfileResponse>('/v1/users/me', {
    method: 'PATCH',
    body: {
      name: profile.name,
      email: profile.email,
      birthDate: toApiDate(profile.birthDate),
    },
  })

  if (response.token) await saveAccessToken(response.token)

  return toProfile(response.profile)
}

export { DEFAULT_USER_PROFILE }