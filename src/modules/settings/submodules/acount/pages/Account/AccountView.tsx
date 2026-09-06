import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import Form, { type FormField } from '@shared/components/forms/Form'
import Section from '@shared/components/layout/Section'
import Text from '@shared/components/ui/Text'
import { DEFAULT_USER_PROFILE } from '@settings/submodules/acount/pages/Account/ProfileModel'
import { colors } from '@shared/styles/style'

export default function AccountView() {
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE)
  const [saved, setSaved] = useState(false)

  const updateField = (field: keyof typeof profile, value: string) => {
    setSaved(false)
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const fields: FormField[] = [
    {
      key: 'name',
      label: 'Nome completo',
      placeholder: 'Digite seu nome completo',
      value: profile.name,
      autoCapitalize: 'words',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('name', value),
    },
    {
      key: 'email',
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      value: profile.email,
      keyboardType: 'email-address',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('email', value),
    },
    {
      key: 'birthDate',
      label: 'Data de nascimento',
      placeholder: 'Selecione sua data de nascimento',
      value: profile.birthDate,
      type: 'date',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('birthDate', value),
    },
  ]

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Section>
          <Text style={styles.title}>Meu perfil</Text>
          <Text style={styles.subtitle}>Atualize seus dados pessoais.</Text>
          <Form fields={fields} submitText="Salvar alterações" isSubmitting={false} onSubmit={() => setSaved(true)} statusMessage={saved ? 'Alterações salvas nesta sessão.' : undefined} />
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
