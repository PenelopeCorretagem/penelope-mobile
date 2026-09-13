export type ContactType = 'email' | 'whatsapp' | 'instagram' | 'facebook' | 'linkedin' | 'twitter'

export type ContactItem = {
  id: string
  type: ContactType
  href: string
  label: string
}
