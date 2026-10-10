import { useState } from 'react'
import { requestPasswordReset } from '@auth/services/authService'
import { getPasswordRecoveryEmailError } from './PasswordRecoveryModel'

const MINIMUM_LOADING_VISIBLE_MS = 1000
const SUCCESS_MESSAGE_VISIBLE_MS = 1000

export function usePasswordRecoveryViewModel() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const updateEmail = (value: string) => {
    setEmail(value)
    setError(null)
    setSuccessMessage(null)
  }

  const handleSubmit = async () => {
    const validationError = getPasswordRecoveryEmailError(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)
    const loadingStartedAt = Date.now()

    try {
      let requestFailed = false
      let requestError: unknown
      let responseMessage = ''
      try {
        responseMessage = await requestPasswordReset(email.trim())
      } catch (caughtError) {
        requestFailed = true
        requestError = caughtError
      }

      const remainingLoadingTime = MINIMUM_LOADING_VISIBLE_MS - (Date.now() - loadingStartedAt)
      if (remainingLoadingTime > 0) {
        await new Promise<void>((resolve) => setTimeout(resolve, remainingLoadingTime))
      }

      if (requestFailed) {
        setError(requestError instanceof Error
          ? requestError.message
          : 'Não foi possível solicitar a recuperação de senha.')
        return
      }

      setSuccessMessage(responseMessage || 'Se o e-mail estiver cadastrado, enviaremos as instruções de recuperação.')
      await new Promise<void>((resolve) => setTimeout(resolve, SUCCESS_MESSAGE_VISIBLE_MS))
      setSuccessMessage(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    error,
    successMessage,
    isSubmitting,
    updateEmail,
    handleSubmit,
  }
}