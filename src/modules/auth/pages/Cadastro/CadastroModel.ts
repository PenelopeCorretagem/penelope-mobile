export type CadastroFormState = {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmSenha: string;
};

export const createEmptyCadastroForm = (): CadastroFormState => ({
  nomeCompleto: "",
  email: "",
  senha: "",
  confirmSenha: "",
});

export function getCadastroFieldError(
  form: CadastroFormState,
  field: keyof CadastroFormState,
): string {
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  if (field === "nomeCompleto") {
    if (!form.nomeCompleto.trim()) return "Informe seu nome completo.";
    if (form.nomeCompleto.trim().length < 2)
      return "Seu nome deve ter pelo menos 2 letras.";
    return "";
  }

  if (field === "email") {
    if (!form.email.trim()) return "Informe seu e-mail.";
    if (!emailIsValid) return "Informe um e-mail válido.";
    return "";
  }

  if (field === "senha") {
    if (!form.senha.trim()) return "Crie uma senha.";
    if (form.senha.length < 6)
      return "A senha deve ter no mínimo 6 caracteres.";
    return "";
  }

  if (!form.confirmSenha.trim()) return "Confirme sua senha.";
  if (form.senha !== form.confirmSenha) return "As senhas precisam ser iguais.";

  return "";
}

export function getCadastroFieldErrors(form: CadastroFormState) {
  return {
    nomeCompleto: getCadastroFieldError(form, "nomeCompleto"),
    email: getCadastroFieldError(form, "email"),
    senha: getCadastroFieldError(form, "senha"),
    confirmSenha: getCadastroFieldError(form, "confirmSenha"),
  };
}

export function validateCadastroForm(form: CadastroFormState) {
  const errors = getCadastroFieldErrors(form);

  if (Object.values(errors).some(Boolean)) {
    return "Preencha todos os campos corretamente para concluir o cadastro.";
  }

  return null;
}
