import { useState } from "react";
import { router } from "expo-router";
import {
  createEmptyLoginForm,
  getLoginFieldError,
  getLoginFieldErrors,
  LoginFormState,
  validateLoginForm,
} from "./LoginModel";
import { APP_ROUTES } from "@shared/constants/routes";
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

  const handleSubmit = async () => {
    const nextErrors = getLoginFieldErrors(form);
    setFieldErrors(nextErrors);

    const validationError = validateLoginForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await login(form.email.trim(), form.senha);
      router.replace(APP_ROUTES.imoveis);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Nao foi possivel entrar.");
    } finally {
      setIsSubmitting(false);
    }
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
