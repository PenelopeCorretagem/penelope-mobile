export function getPasswordRecoveryEmailError(email: string) {
  const normalizedEmail = email.trim();
  if (!normalizedEmail) return "Informe seu e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return "Informe um e-mail válido.";
  }

  return "";
}