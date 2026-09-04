import { Ionicons } from '@expo/vector-icons'
import type { ContactType } from '@dtos/Contact'

type IconProps = {
  type: ContactType
  size: number
  color: string
}

const iconMap: Record<ContactType, keyof typeof Ionicons.glyphMap> = {
  email: 'mail',
  whatsapp: 'logo-whatsapp',
  instagram: 'logo-instagram',
  facebook: 'logo-facebook',
  linkedin: 'logo-linkedin',
  twitter: 'logo-x',
}

export function ContactIcon({ type, size, color }: IconProps) {
  const iconName = iconMap[type] || 'link'

  return <Ionicons name={iconName} size={size} color={color} />
}
