import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import {
  createEmptyCadastroForm,
  CadastroFormState,
  getCadastroFieldError,
  getCadastroFieldErrors,
  validateCadastroStep,
  validateCadastroForm,
} from "./CadastroModel";

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

  const updateField = (field: keyof CadastroFormState, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    const nextFieldError = getCadastroFieldError(nextForm, field);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: nextFieldError,
    }));

    setError(null);
  };

  const handleSubmit = () => {
    const nextErrors = getCadastroFieldErrors(form);
    setFieldErrors(nextErrors);

    const validationError = validateCadastroForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      Alert.alert("Cadastro", "Cadastro realizado com sucesso!");
      setIsSubmitting(false);
      router.replace("/login");
    }, 500);
  };

  const handleNext = () => {
    const firstStepFields = ["nomeCompleto", "dataNascimento"] as const;
    const nextErrors = getCadastroFieldErrors(form);
    setFieldErrors(nextErrors);

    if (validateCadastroStep(form, [...firstStepFields])) return;

    setStep(2);
  };

  const handleBack = () => setStep(1);

  return {
    form,
    error,
    fieldErrors,
    isSubmitting,
    step,
    updateField,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
