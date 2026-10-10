import AuthScreen, { type AuthInputField } from '@auth/components/AuthScreen'
import { APP_ROUTES } from '@constant/routes'
import { usePasswordRecoveryViewModel } from './usePasswordRecoveryViewModel'

export default function PasswordRecoveryView() {
  const {
    email,
    error,
    successMessage,
    isSubmitting,
    updateEmail,
    handleSubmit,
  } = usePasswordRecoveryViewModel()

  const fields: AuthInputField[] = [
    {
      key: 'email',
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      value: email,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      onChangeText: updateEmail,
    },
  ]

  return (
    <AuthScreen
      title="Recuperar senha"
      subtitle="Informe seu e-mail para receber as instruções de recuperação."
      fields={fields}
      submitText="Enviar instruções"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      statusMessage={successMessage ?? (isSubmitting ? 'Enviando instruções de recuperação...' : error ?? undefined)}
      statusVariant={successMessage ? 'success' : error ? 'error' : 'info'}
      statusLoading={isSubmitting && !successMessage && !error}
      secondaryPrompt="Já lembrou sua senha?"
      secondaryActionLabel="Voltar para o login"
      secondaryActionHref={APP_ROUTES.auth.login}
    />
  )
}