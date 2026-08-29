import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import {
  createEmptyLoginForm,
  getLoginFieldError,
  getLoginFieldErrors,
  LoginFormState,
  validateLoginForm,
} from "./LoginModel";

export function useLoginViewModel() {
  const [form, setForm] = useState<LoginFormState>(createEmptyLoginForm);
  const [fieldErrors, setFieldErrors] = useState({ email: "", senha: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof LoginFormState, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    const nextFieldError = getLoginFieldError(nextForm, field);
    setFieldErrors({
      email: field === "email" ? nextFieldError : "",
      senha: field === "senha" ? nextFieldError : "",
    });

    setError(null);
  };

  const handleSubmit = () => {
    //Comentar para logar sem precisar escrever nada
    //apenas apertar no entrar
    // const nextErrors = getLoginFieldErrors(form)
    // setFieldErrors(nextErrors)

    // const validationError = validateLoginForm(form)

    // if (validationError) {
    //   setError(validationError)
    //   return
    // }
    // COmente ate aqui

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      Alert.alert("Login", "Acesso realizado com sucesso!");
      setIsSubmitting(false);
      router.replace("/home");
    }, 500);
  };

  return {
    form,
    error,
    fieldErrors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
}
