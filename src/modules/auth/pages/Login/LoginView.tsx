import { View, Text } from "react-native";
import { AuthScreen } from "@auth/components/AuthScreen";
import { colors } from "@shared/styles/style";
import { useLoginViewModel } from "./useLoginViewModel";

export function LoginView() {
  const { form, fieldErrors, isSubmitting, updateField, handleSubmit } =
    useLoginViewModel();

  return (
    <AuthScreen
      title="Acessar Conta"
      subtitle="Utilize seu e-mail e senha para entrar."
      fields={[
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
          placeholder: "Digite sua senha",
          value: form.senha,
          secureTextEntry: true,
          error: fieldErrors.senha,
          onChangeText: (value) => updateField("senha", value),
        },
      ]}
      submitText="Entrar"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      helperLabel="Esqueceu a senha?"
      helperHref="/login"
      helperActionLabel="Redefinir senha"
      secondaryPrompt="Não tem conta?"
      secondaryActionLabel="Cadastre-se"
      secondaryActionHref="/cadastro"
    />
  );
}
