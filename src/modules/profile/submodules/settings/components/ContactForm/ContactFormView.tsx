import { useState } from 'react'
import { View, TextInput, ScrollView, Alert } from 'react-native'
import { colors, spacing } from '@shared/styles/style'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import Heading from '@shared/components/ui/Heading'
import { ContactsModel } from '@profile/submodules/settings/pages/Contacts/ContactsModel'

type FormData = {
  subject: string
  message: string
}

export function ContactFormView() {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const handleSubmit = async () => {
    const validation = ContactsModel.validateFormData(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      Alert.alert('Erro', 'Por favor, corrija os erros no formulário')
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Implementar envio do formulário com serviço real
      console.log('Formulário enviado:', formData)
      Alert.alert('Sucesso', 'Mensagem enviada com sucesso!')
      setFormData({ subject: '', message: '' })
      setErrors({})
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (label: string, field: keyof FormData, placeholder: string, multiline: boolean = false) => (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={{ marginBottom: spacing.sm, fontWeight: '600', fontSize: 14, color: colors.text }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={value => handleChange(field, value)}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={{
          borderWidth: 1.5,
          borderColor: errors[field] ? colors.error : colors.mutedText,
          borderRadius: 8,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          color: colors.text,
          backgroundColor: colors.white,
          fontFamily: 'System',
          fontSize: 14,
          height: multiline ? 112 : 56,
        }}
        placeholderTextColor={colors.mutedText}
      />
      {errors[field] && (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: spacing.sm }}>
          ❌ {errors[field]}
        </Text>
      )}
    </View>
  )

  return (
    <ScrollView
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.lg,
      }}
      scrollEnabled={false}
    >
      <View>
        {renderField('Assunto', 'subject', 'Qual é o motivo do contato?')}
        {renderField('Mensagem', 'message', 'Escreva sua mensagem...', true)}

        <Button
          onPress={handleSubmit}
          label={isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          style={{ marginTop: spacing.md, alignSelf: 'center' }}
        />
      </View>
    </ScrollView>
  )
}
