import { useState } from 'react'
import { View, TextInput, ScrollView, Alert } from 'react-native'
import { colors, spacing } from '@shared/styles/style'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import Heading from '@shared/components/ui/Heading'
import { ContactsModel } from '../../pages/Contacts/ContactsModel'
import { useTranslation } from 'react-i18next'

type FormData = {
  subject: string
  message: string
}

type ContactFormProps = {
  onFieldFocus?: () => void
}

export function ContactFormView({ onFieldFocus }: ContactFormProps) {
  const { t } = useTranslation()
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
      Alert.alert(t('settings.contacts.alertError'), t('settings.contacts.validationError'))
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Implementar envio do formulário com serviço real
      console.log('Formulário enviado:', formData)
      Alert.alert(t('settings.contacts.alertSuccess'), t('settings.contacts.success'))
      setFormData({ subject: '', message: '' })
      setErrors({})
    } catch (error) {
      Alert.alert(t('settings.contacts.alertError'), t('settings.contacts.submitError'))
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
        onFocus={onFieldFocus}
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
          ❌ {t(errors[field], { defaultValue: errors[field] })}
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
        {renderField(t('settings.contacts.subject'), 'subject', t('settings.contacts.subjectPlaceholder'))}
        {renderField(t('settings.contacts.message'), 'message', t('settings.contacts.messagePlaceholder'), true)}

        <Button
          onPress={handleSubmit}
          label={isSubmitting ? t('settings.contacts.submitting') : t('settings.contacts.submit')}
          style={{ marginTop: spacing.md, alignSelf: 'center' }}
        />
      </View>
    </ScrollView>
  )
}
