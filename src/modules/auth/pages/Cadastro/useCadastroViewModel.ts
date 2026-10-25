import { useState } from "react";
import { router } from "expo-router";
import { APP_ROUTES } from "@shared/constants/routes";
import { registerAccount } from "@auth/services/authService";
import {
  createEmptyCadastroForm,
  CadastroFormState,
  getCadastroFieldError,
  getCadastroFieldErrors,
  validateCadastroStep,
  validateCadastroForm,
  maskCadastroDateInput,
  toCadastroApiBirthDate,
} from "./CadastroModel";

const MINIMUM_LOADING_VISIBLE_MS = 1000;
const SUCCESS_MESSAGE_VISIBLE_MS = 1000;

export function useCadastroViewModel() {
  const [form, setForm] = useState<CadastroFormState>(createEmptyCadastroForm);
  const [fieldErrors, setFieldErrors] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (field: keyof CadastroFormState, value: string) => {
    const fieldValue = field === "dataNascimento" ? maskCadastroDateInput(value) : value;
    const nextForm = { ...form, [field]: fieldValue };
    setForm(nextForm);

    const shouldValidateField = step === 1 || Boolean(fieldErrors[field]);
    const nextFieldError = shouldValidateField ? getCadastroFieldError(nextForm, field) : "";
    setFieldErrors((prev) => ({
      ...prev,
      [field]: nextFieldError,
    }));

    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async () => {
    const nextErrors = getCadastroFieldErrors(form);
    setFieldErrors(nextErrors);

    const validationError = validateCadastroForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    const loadingStartedAt = Date.now();

    try {
      let registrationFailed = false;
      let registrationError: unknown;
      try {
        await registerAccount({
          name: form.nomeCompleto.trim(),
          birthDate: toCadastroApiBirthDate(form.dataNascimento),
          email: form.email.trim(),
          password: form.senha,
        });
      } catch (requestError) {
        registrationFailed = true;
        registrationError = requestError;
      }

      const remainingLoadingTime = MINIMUM_LOADING_VISIBLE_MS - (Date.now() - loadingStartedAt);
      if (remainingLoadingTime > 0) {
        await new Promise<void>((resolve) => setTimeout(resolve, remainingLoadingTime));
      }

      if (registrationFailed) {
        setError(registrationError instanceof Error
          ? registrationError.message
          : "Não foi possível concluir o cadastro.");
        return;
      }

      setSuccessMessage("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      await new Promise<void>((resolve) => setTimeout(resolve, SUCCESS_MESSAGE_VISIBLE_MS));
      router.replace(APP_ROUTES.auth.login);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    const firstStepFields = ["nomeCompleto", "dataNascimento"] as const;
    const firstStepErrors = firstStepFields.reduce(
      (errors, field) => ({
        ...errors,
        [field]: getCadastroFieldError(form, field),
      }),
      {} as Pick<typeof fieldErrors, (typeof firstStepFields)[number]>,
    );
    setFieldErrors((prev) => ({ ...prev, ...firstStepErrors }));

    if (validateCadastroStep(form, [...firstStepFields])) return;

    setStep(2);
  };

  const handleBack = () => setStep(1);

  return {
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
  };
}
