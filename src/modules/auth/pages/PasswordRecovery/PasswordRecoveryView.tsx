import { useState } from 'react'
import AuthScreen, { type AuthInputField } from '@auth/components/AuthScreen'

export default function PasswordRecoveryView() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const fields: AuthInputField[] = [
    {
      key: 'email',
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      value: email,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      onChangeText: (value) => {
        setSubmitted(false)
        setEmail(value)
      },
    },
  ]

  return (
    <AuthScreen
      title="Recuperar senha"
      subtitle="Informe seu e-mail para receber as instruções de recuperação."
      fields={fields}
      submitText="Enviar instruções"
      isSubmitting={false}
      onSubmit={() => setSubmitted(true)}
      statusMessage={submitted ? 'Verifique seu e-mail para continuar.' : undefined}
    />
  )
}