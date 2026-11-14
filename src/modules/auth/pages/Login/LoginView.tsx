import AuthScreen from "@auth/components/AuthScreen";
import { useLoginViewModel } from "./useLoginViewModel";
import { APP_ROUTES } from '@shared/constants/routes'
import { useTranslation } from 'react-i18next'

export function LoginView() {
  const { t } = useTranslation()
  const {
    form,
    error,
    successMessage,
    fieldErrors,
    isSubmitting,
    updateField,
    handleSubmit,
  } = useLoginViewModel();

  return (
    <AuthScreen
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginSubtitle')}
      fields={[
        {
          key: "email",
          label: t('auth.email'),
          placeholder: t('auth.email'),
          value: form.email,
          keyboardType: "email-address",
          autoCapitalize: "none",
          error: fieldErrors.email ? t(fieldErrors.email, { defaultValue: fieldErrors.email }) : '',
          onChangeText: (value) => updateField("email", value),
        },
        {
          key: "senha",
          label: t('auth.password'),
          placeholder: t('auth.passwordPlaceholder'),
          value: form.senha,
          secureTextEntry: true,
          error: fieldErrors.senha ? t(fieldErrors.senha, { defaultValue: fieldErrors.senha }) : '',
          onChangeText: (value) => updateField("senha", value),
        },
      ]}
      submitText={t('auth.login')}
      submittingText={t('auth.loggingInButton')}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      statusMessage={successMessage ? t(successMessage, { defaultValue: successMessage }) : isSubmitting ? t('auth.loggingIn') : error ? t(error, { defaultValue: error }) : undefined}
      statusVariant={successMessage ? "success" : error ? "error" : "info"}
      statusLoading={isSubmitting && !successMessage && !error}
      helperLabel={t('auth.forgotPassword')}
      helperHref={ APP_ROUTES.auth.recuperar_senha}
      helperActionLabel={t('auth.resetPassword')}
      secondaryPrompt={t('auth.noAccount')}
      secondaryActionLabel={t('auth.signUp')}
      secondaryActionHref={ APP_ROUTES.auth.cadastro}
    />
  );
}
