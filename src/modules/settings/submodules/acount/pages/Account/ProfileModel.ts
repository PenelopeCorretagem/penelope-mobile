export type UserProfile = {
  name: string
  email: string
  birthDate: string
  profileImage: string | null
}

export type ProfileValidationError =
  | 'settings.profileErrors.nameRequired'
  | 'settings.profileErrors.emailInvalid'
  | 'settings.profileErrors.birthDateRequired'

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: '',
  email: '',
  birthDate: '',
  profileImage: null,
}

export function validateUserProfile(profile: UserProfile): ProfileValidationError | null {
  if (!profile.name.trim()) return 'settings.profileErrors.nameRequired'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) return 'settings.profileErrors.emailInvalid'
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(profile.birthDate.trim())) return 'settings.profileErrors.birthDateRequired'

  return null
}

export function getProfileInitials(name: string): string {
  const prepositions = ['da', 'de', 'do', 'das', 'dos', 'e']

  return name
    .split(' ')
    .filter((part) => part && !prepositions.includes(part.toLowerCase()))
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
