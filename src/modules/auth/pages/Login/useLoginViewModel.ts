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
import { APP_ROUTES } from "@constant/routes";
import { useAuth } from "@shared/context/AuthContext";

export function useLoginViewModel() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormState>(createEmptyLoginForm);
  const [fieldErrors, setFieldErrors] = useState({ email: "", senha: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof LoginFormState, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    const nextFieldError = getLoginFieldError(nextForm, field);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: nextFieldError,
    }));

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
      login();
      setIsSubmitting(false);
      router.replace(APP_ROUTES.imoveis);
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
