export type UserProfile = {
  name: string
  email: string
  birthDate: string
  profileImage: string | null
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Maria da Silva',
  email: 'maria@penelope.com.br',
  birthDate: '01/01/1990',
  profileImage: null,
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
