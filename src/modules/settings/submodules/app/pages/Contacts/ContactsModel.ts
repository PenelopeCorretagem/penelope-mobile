export class ContactsModel {
  static readonly FORM_FIELDS = {
    NAME: 'name',
    EMAIL: 'email',
    SUBJECT: 'subject',
    MESSAGE: 'message',
  }

  static validateFormData(data: Record<string, string>) {
    const errors: Record<string, string> = {}

    if (!data.subject?.trim()) {
      errors.subject = 'settings.contacts.subjectRequired'
    }

    if (!data.message?.trim()) {
      errors.message = 'settings.contacts.messageRequired'
    } else if (data.message.trim().length < 10) {
      errors.message = 'settings.contacts.messageMinLength'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
