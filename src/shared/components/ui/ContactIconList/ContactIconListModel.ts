import type { ContactItem, ContactType } from '@dtos/Contact'

export class ContactIconListModel {
  static readonly CONTACT_TYPES: Record<string, ContactType> = {
    EMAIL: 'email',
    WHATSAPP: 'whatsapp',
    INSTAGRAM: 'instagram',
    FACEBOOK: 'facebook',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
  }

  static getDefaultContacts(): ContactItem[] {
    return [
      {
        id: 'email',
        type: this.CONTACT_TYPES.EMAIL,
        href: 'mailto:contato@penelope.com.br',
        label: 'Email',
      },
      {
        id: 'whatsapp',
        type: this.CONTACT_TYPES.WHATSAPP,
        href: 'https://wa.me/5511987419606',
        label: 'WhatsApp',
      },
      {
        id: 'instagram',
        type: this.CONTACT_TYPES.INSTAGRAM,
        href: 'https://www.instagram.com/consultora.penelope/',
        label: 'Instagram',
      },
      {
        id: 'facebook',
        type: this.CONTACT_TYPES.FACEBOOK,
        href: 'https://www.facebook.com/bella.medeiros.562',
        label: 'Facebook',
      },
    ]
  }

  static validateContactListProps(contacts: ContactItem[]) {
    const errors: string[] = []

    if (!contacts || !Array.isArray(contacts)) {
      errors.push('Lista de contatos deve ser um array')
    }

    if (contacts && contacts.length === 0) {
      errors.push('Lista de contatos não pode estar vazia')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}
