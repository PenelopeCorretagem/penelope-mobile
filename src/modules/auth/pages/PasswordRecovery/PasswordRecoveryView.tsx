import AuthScreen, { type AuthInputField } from '@auth/components/AuthScreen'
import { APP_ROUTES } from '@constant/routes'
import { usePasswordRecoveryViewModel } from './usePasswordRecoveryViewModel'
import { useTranslation } from 'react-i18next'

export default function PasswordRecoveryView() {
  const { t } = useTranslation()
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
      label: t('auth.email'),
      placeholder: t('auth.email'),
      value: email,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      onChangeText: updateEmail,
    },
  ]

  return (
    <AuthScreen
      title={t('auth.recoverPassword')}
      subtitle={t('auth.recoverSubtitle')}
      fields={fields}
      submitText={t('auth.sendInstructions')}
      submittingText={t('auth.sendingInstructionsButton')}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      statusMessage={successMessage ?? (isSubmitting ? t('auth.sendingInstructions') : error ?? undefined)}
      statusVariant={successMessage ? 'success' : error ? 'error' : 'info'}
      statusLoading={isSubmitting && !successMessage && !error}
      secondaryPrompt={t('auth.rememberedPassword')}
      secondaryActionLabel={t('auth.backToLogin')}
      secondaryActionHref={APP_ROUTES.auth.login}
    />
  )
}