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
      errors.subject = 'Assunto é obrigatório'
    }

    if (!data.message?.trim()) {
      errors.message = 'Mensagem é obrigatória'
    } else if (data.message.trim().length < 10) {
      errors.message = 'A mensagem deve ter pelo menos 10 caracteres'
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
