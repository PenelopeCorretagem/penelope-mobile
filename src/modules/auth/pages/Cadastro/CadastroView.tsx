import AuthScreen from "@auth/components/AuthScreen/AuthScreenView";
import { useCadastroViewModel } from "./useCadastroViewModel";
import { APP_ROUTES } from '@shared/constants/routes'
import { useTranslation } from 'react-i18next'

export function CadastroView() {
  const { t } = useTranslation()
  const {
    form,
    error,
    successMessage,
    fieldErrors,
    isSubmitting,
    step,
    updateField,
    handleNext,
    handleBack,
    handleSubmit,
  } = useCadastroViewModel();

  const fields = step === 1
    ? [
        {
          key: "nomeCompleto",
          label: t('auth.fullName'),
          placeholder: t('auth.fullNamePlaceholder'),
          value: form.nomeCompleto,
          autoCapitalize: "words" as const,
          error: fieldErrors.nomeCompleto ? t(fieldErrors.nomeCompleto, { defaultValue: fieldErrors.nomeCompleto }) : '',
          onChangeText: (value: string) => updateField("nomeCompleto", value),
        },
        {
          key: "dataNascimento",
          label: t('auth.birthDate'),
          placeholder: t('auth.birthDatePlaceholder'),
          value: form.dataNascimento,
          type: "text" as const,
          keyboardType: "numeric" as const,
          error: fieldErrors.dataNascimento ? t(fieldErrors.dataNascimento, { defaultValue: fieldErrors.dataNascimento }) : '',
          onChangeText: (value: string) => updateField("dataNascimento", value),
        },
      ]
    : [
        {
          key: "email",
          label: t('auth.email'),
          placeholder: t('auth.email'),
          value: form.email,
          keyboardType: "email-address" as const,
          autoCapitalize: "none" as const,
          error: fieldErrors.email ? t(fieldErrors.email, { defaultValue: fieldErrors.email }) : '',
          onChangeText: (value: string) => updateField("email", value),
        },
        {
          key: "senha",
          label: t('auth.password'),
          placeholder: t('auth.createPassword'),
          value: form.senha,
          secureTextEntry: true,
          error: fieldErrors.senha ? t(fieldErrors.senha, { defaultValue: fieldErrors.senha }) : '',
          onChangeText: (value: string) => updateField("senha", value),
        },
        {
          key: "confirmSenha",
          label: t('auth.confirmPassword'),
          placeholder: t('auth.repeatPassword'),
          value: form.confirmSenha,
          secureTextEntry: true,
          error: fieldErrors.confirmSenha ? t(fieldErrors.confirmSenha, { defaultValue: fieldErrors.confirmSenha }) : '',
          onChangeText: (value: string) => updateField("confirmSenha", value),
        },
      ];

  return (
    <AuthScreen
      title={t('auth.createAccount')}
      subtitle={t('auth.createAccountSubtitle')}
      fields={fields}
      submitText={t('auth.signUp')}
      submittingText={t('auth.signingUpButton')}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onNext={handleNext}
      onBack={step === 2 ? handleBack : undefined}
      isLastStep={step === 2}
      step={step}
      totalSteps={2}
      statusMessage={successMessage ? t(successMessage, { defaultValue: successMessage }) : isSubmitting ? t('auth.signingUp') : error ? t(error, { defaultValue: error }) : undefined}
      statusVariant={successMessage ? "success" : error ? "error" : "info"}
      statusLoading={isSubmitting && !successMessage && !error}
      secondaryPrompt={t('auth.alreadyAccount')}
      secondaryActionLabel={t('auth.access')}
      secondaryActionHref={ APP_ROUTES.auth.login }
    />
  );
}
