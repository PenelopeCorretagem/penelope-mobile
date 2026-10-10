export type CadastroFormState = {
  nomeCompleto: string;
  dataNascimento: string;
  email: string;
  senha: string;
  confirmSenha: string;
};

export type CadastroField = keyof CadastroFormState;

export const createEmptyCadastroForm = (): CadastroFormState => ({
  nomeCompleto: "",
  dataNascimento: "",
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

  if (field === "dataNascimento") {
    if (!form.dataNascimento.trim()) return "Informe sua data de nascimento.";
    if (!isValidBirthDate(form.dataNascimento)) {
      return "Informe uma data válida no formato DD/MM/AAAA.";
    }
    if (isFutureBirthDate(form.dataNascimento)) {
      return "A data de nascimento não pode ser futura.";
    }
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
    dataNascimento: getCadastroFieldError(form, "dataNascimento"),
    email: getCadastroFieldError(form, "email"),
    senha: getCadastroFieldError(form, "senha"),
    confirmSenha: getCadastroFieldError(form, "confirmSenha"),
  };
}

export function validateCadastroStep(
  form: CadastroFormState,
  fields: CadastroField[],
) {
  const hasErrors = fields.some((field) => Boolean(getCadastroFieldError(form, field)));

  return hasErrors ? "Preencha os campos corretamente para continuar." : null;
}

export function validateCadastroForm(form: CadastroFormState) {
  const errors = getCadastroFieldErrors(form);

  if (Object.values(errors).some(Boolean)) {
    return "Preencha todos os campos corretamente para concluir o cadastro.";
  }

  return null;
}

export function toCadastroApiBirthDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return value;

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

export function maskCadastroDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function getBirthDateParts(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) return null;
  return { day, month, year };
}

function isValidBirthDate(value: string) {
  return getBirthDateParts(value) !== null;
}

function isFutureBirthDate(value: string) {
  const birthDate = getBirthDateParts(value);
  if (!birthDate) return false;

  const today = new Date();
  if (birthDate.year !== today.getFullYear()) return birthDate.year > today.getFullYear();
  if (birthDate.month !== today.getMonth() + 1) return birthDate.month > today.getMonth() + 1;
  return birthDate.day > today.getDate();
}
