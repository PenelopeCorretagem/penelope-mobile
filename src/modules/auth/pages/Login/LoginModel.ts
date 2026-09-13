export type LoginFormState = {
  email: string;
  senha: string;
};

export const createEmptyLoginForm = (): LoginFormState => ({
  email: "",
  senha: "",
});

export function getLoginFieldError(
  form: LoginFormState,
  field: keyof LoginFormState,
): string {
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  if (field === "email") {
    if (!form.email.trim()) return "Informe seu e-mail.";
    if (!emailIsValid) return "Informe um e-mail válido.";
    return "";
  }

  if (!form.senha.trim()) return "Digite sua senha.";
  if (form.senha.length < 6) return "A senha deve ter no mínimo 6 caracteres.";

  return "";
}

export function getLoginFieldErrors(form: LoginFormState) {
  return {
    email: getLoginFieldError(form, "email"),
    senha: getLoginFieldError(form, "senha"),
  };
}

export function validateLoginForm(form: LoginFormState) {
  const errors = getLoginFieldErrors(form);

  if (errors.email || errors.senha) {
    return "Preencha seu e-mail e senha para continuar.";
  }

  return null;
}
