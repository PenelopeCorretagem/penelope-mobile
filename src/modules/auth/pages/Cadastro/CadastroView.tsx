import { View, Text } from "react-native";
import { AuthScreen } from "@auth/components/AuthScreen";
import { colors } from "@shared/styles/style";
import { useCadastroViewModel } from "./useCadastroViewModel";

export function CadastroView() {
  const { form, fieldErrors, isSubmitting, updateField, handleSubmit } =
    useCadastroViewModel();

  return (
    <AuthScreen
      title="Criar Conta"
      subtitle="Preencha os campos para iniciar sua jornada."
      fields={[
        {
          key: "nomeCompleto",
          label: "Nome completo",
          placeholder: "Seu nome completo",
          value: form.nomeCompleto,
          autoCapitalize: "words",
          error: fieldErrors.nomeCompleto,
          onChangeText: (value) => updateField("nomeCompleto", value),
        },
        {
          key: "email",
          label: "E-mail",
          placeholder: "seuemail@exemplo.com",
          value: form.email,
          keyboardType: "email-address",
          autoCapitalize: "none",
          error: fieldErrors.email,
          onChangeText: (value) => updateField("email", value),
        },
        {
          key: "senha",
          label: "Senha",
          placeholder: "Crie uma senha",
          value: form.senha,
          secureTextEntry: true,
          error: fieldErrors.senha,
          onChangeText: (value) => updateField("senha", value),
        },
        {
          key: "confirmSenha",
          label: "Confirmar senha",
          placeholder: "Repita a senha",
          value: form.confirmSenha,
          secureTextEntry: true,
          error: fieldErrors.confirmSenha,
          onChangeText: (value) => updateField("confirmSenha", value),
        },
      ]}
      submitText="Cadastrar"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      secondaryPrompt="Já tem conta?"
      secondaryActionLabel="Acessar"
      secondaryActionHref="/login"
    />
  );
}
