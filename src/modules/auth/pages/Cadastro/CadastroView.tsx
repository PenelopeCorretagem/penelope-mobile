import { View, Text } from "react-native";
import AuthScreen from "@auth/components/AuthScreen/AuthScreenView";
import { colors } from "@shared/styles/style";
import { useCadastroViewModel } from "./useCadastroViewModel";
import { APP_ROUTES } from '@constant/routes'

export function CadastroView() {
  const {
    form,
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
          label: "Nome completo",
          placeholder: "Digite seu nome completo",
          value: form.nomeCompleto,
          autoCapitalize: "words" as const,
          error: fieldErrors.nomeCompleto,
          onChangeText: (value: string) => updateField("nomeCompleto", value),
        },
        {
          key: "dataNascimento",
          label: "Data de nascimento",
          placeholder: "Digite sua data de nascimento",
          value: form.dataNascimento,
          type: "date" as const,
          error: fieldErrors.dataNascimento,
          onChangeText: (value: string) => updateField("dataNascimento", value),
        },
      ]
    : [
        {
          key: "email",
          label: "E-mail",
          placeholder: "Digite seu e-mail",
          value: form.email,
          keyboardType: "email-address" as const,
          autoCapitalize: "none" as const,
          error: fieldErrors.email,
          onChangeText: (value: string) => updateField("email", value),
        },
        {
          key: "senha",
          label: "Senha",
          placeholder: "Crie uma senha",
          value: form.senha,
          secureTextEntry: true,
          error: fieldErrors.senha,
          onChangeText: (value: string) => updateField("senha", value),
        },
        {
          key: "confirmSenha",
          label: "Confirmar senha",
          placeholder: "Repita a senha",
          value: form.confirmSenha,
          secureTextEntry: true,
          error: fieldErrors.confirmSenha,
          onChangeText: (value: string) => updateField("confirmSenha", value),
        },
      ];

  return (
    <AuthScreen
      title="Criar Conta"
      subtitle="Preencha os campos para iniciar sua jornada."
      fields={fields}
      submitText="Cadastrar"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onNext={handleNext}
      onBack={step === 2 ? handleBack : undefined}
      isLastStep={step === 2}
      step={step}
      totalSteps={2}
      secondaryPrompt="Já tem conta?"
      secondaryActionLabel="Acessar"
      secondaryActionHref={ APP_ROUTES.auth.login }
    />
  );
}
