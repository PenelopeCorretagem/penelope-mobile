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
    if (!form.email.trim()) return "auth.validation.emailRequired";
    if (!emailIsValid) return "auth.validation.emailInvalid";
    return "";
  }

  if (!form.senha.trim()) return "auth.validation.passwordRequired";
  if (form.senha.length < 6) return "auth.validation.passwordMinLength";

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
    return "auth.validation.loginRequired";
  }

  return null;
}
