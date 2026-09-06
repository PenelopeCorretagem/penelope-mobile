import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import Form, { type FormField } from '@shared/components/forms/Form'
import Section from '@shared/components/layout/Section'
import Text from '@shared/components/ui/Text'
import { APP_ROUTES } from '@shared/constants/routes'
import { colors } from '@shared/styles/style'

export default function PasswordView() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const fields: FormField[] = [
    {
      key: 'oldPassword',
      label: 'Senha antiga',
      placeholder: 'Digite sua senha atual',
      value: form.oldPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('oldPassword', value),
    },
    {
      key: 'newPassword',
      label: 'Nova senha',
      placeholder: 'Digite sua nova senha',
      value: form.newPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('newPassword', value),
    },
    {
      key: 'confirmPassword',
      label: 'Confirmar nova senha',
      placeholder: 'Repita sua nova senha',
      value: form.confirmPassword,
      secureTextEntry: true,
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('confirmPassword', value),
    },
  ]

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Section>
          <Text style={styles.title}>Alterar senha</Text>
          <Text style={styles.subtitle}>Defina uma nova senha para sua conta.</Text>
          <Form fields={fields} submitText="Salvar nova senha" isSubmitting={false} onSubmit={() => undefined} helperLabel="Esqueceu sua senha?" helperActionLabel="Recuperar senha" helperHref={`/${APP_ROUTES.auth.recuperar_senha}`} />
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  content: { flexGrow: 1 },
  title: { color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: colors.mutedText, fontSize: 16, marginBottom: 24 },
})
