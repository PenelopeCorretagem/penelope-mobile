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

const MINIMUM_LOADING_VISIBLE_MS = 1000;
const SUCCESS_MESSAGE_VISIBLE_MS = 1000;

export function useLoginViewModel() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormState>(createEmptyLoginForm);
  const [fieldErrors, setFieldErrors] = useState({ email: "", senha: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (field: keyof LoginFormState, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    const nextFieldError = getLoginFieldError(nextForm, field);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: nextFieldError,
    }));

    setError(null);
    setSuccessMessage(null);
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
    setSuccessMessage(null);
    const loadingStartedAt = Date.now();

    try {
      let loginFailed = false;
      let loginError: unknown;
      try {
        await login(form.email.trim(), form.senha);
      } catch (requestError) {
        loginFailed = true;
        loginError = requestError;
      }

      const remainingLoadingTime = MINIMUM_LOADING_VISIBLE_MS - (Date.now() - loadingStartedAt);
      if (remainingLoadingTime > 0) {
        await new Promise<void>((resolve) => setTimeout(resolve, remainingLoadingTime));
      }

      if (loginFailed) {
        setError(loginError instanceof Error ? loginError.message : "Não foi possível entrar.");
        return;
      }

      setSuccessMessage("Login realizado com sucesso. Redirecionando...");
      await new Promise<void>((resolve) => setTimeout(resolve, SUCCESS_MESSAGE_VISIBLE_MS));
      router.replace(APP_ROUTES.imoveis);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    error,
    successMessage,
    fieldErrors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
}
