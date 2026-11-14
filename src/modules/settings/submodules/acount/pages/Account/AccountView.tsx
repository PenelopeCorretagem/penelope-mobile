import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Form, { type FormField } from '@shared/components/forms/Form'
import Section from '@shared/components/layout/Section'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'
import { APP_ROUTES } from '@shared/constants/routes'
import { getProfileInitials } from './ProfileModel'
import { useProfileViewModel } from './useProfileViewModel'
import { useTranslation } from 'react-i18next'

export default function AccountView() {
  const { t } = useTranslation()
  const { profile, isLoading, isSaving, error, successMessage, updateField, pickProfileImage, takeProfileImage, removeProfileImage, saveProfile } = useProfileViewModel()
  const [isImageModalVisible, setIsImageModalVisible] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  const closeImageModal = () => setIsImageModalVisible(false)

  const handleSaveProfile = async () => {
    if (!await saveProfile()) return

    setIsRedirecting(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 1500))
    router.replace(APP_ROUTES.configuracoes)
  }

  const handleImageAction = (action: () => void) => {
    closeImageModal()
    action()
  }

  const scrollToFocusedField = () => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 250)
  }

  const fields: FormField[] = [
    {
      key: 'name',
      label: t('auth.fullName'),
      placeholder: t('auth.fullNamePlaceholder'),
      value: profile.name,
      autoCapitalize: 'words',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('name', value),
    },
    {
      key: 'email',
      label: t('auth.email'),
      placeholder: t('settings.emailPlaceholder'),
      value: profile.email,
      keyboardType: 'email-address',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('email', value),
    },
    {
      key: 'birthDate',
      label: t('auth.birthDate'),
      placeholder: t('settings.birthDatePlaceholder'),
      value: profile.birthDate,
      type: 'date',
      inputBackgroundColor: colors.primaryLight,
      onChangeText: (value) => updateField('birthDate', value),
    },
  ]

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <ScrollView ref={scrollViewRef} automaticallyAdjustKeyboardInsets contentContainerStyle={[styles.content,]} keyboardShouldPersistTaps="handled">
        <Section>
          <View style={styles.profileImageSection}>
            <Pressable accessibilityLabel={t('settings.editProfileImage')} accessibilityRole="button" onPress={() => setIsImageModalVisible(true)} style={styles.avatarWrapper}>
              <View style={styles.avatar}>
              {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} /> : <Text style={styles.avatarText}>{getProfileInitials(profile.name)}</Text>}
              </View>
              <View style={styles.cameraButton}>
                <Ionicons name="camera-outline" size={18} color={colors.white} />
              </View>
            </Pressable>
          </View>
          <Text style={styles.title}>{t('settings.profile')}</Text>
          <Text style={styles.subtitle}>{t('settings.profileDescription')}</Text>
          {isLoading ? <Text style={styles.statusText}>{t('settings.loadingProfile')}</Text> : null}
          <Form fields={fields} submitText={t('settings.saveChanges')} submittingText={t('settings.savingChanges')} isSubmitting={isSaving || isLoading || isRedirecting} onSubmit={() => void handleSaveProfile()} onFieldFocus={scrollToFocusedField} statusMessage={error ? t(error) : successMessage ? t(successMessage) : undefined} statusVariant={successMessage ? 'success' : 'error'} />
        </Section>
      </ScrollView>
      <Modal animationType="fade" transparent visible={isImageModalVisible} onRequestClose={closeImageModal}>
        <Pressable style={styles.modalBackdrop} onPress={closeImageModal}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('settings.profileImage')}</Text>
              <Pressable accessibilityLabel={t('common.close')} accessibilityRole="button" onPress={closeImageModal}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
            <Pressable style={styles.modalOption} onPress={() => handleImageAction(pickProfileImage)} accessibilityRole="button">
              <Ionicons name="images-outline" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>{t('settings.chooseFromGallery')}</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={() => handleImageAction(takeProfileImage)} accessibilityRole="button">
              <Ionicons name="camera-outline" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>{t('settings.takePhoto')}</Text>
            </Pressable>
            {profile.profileImage ? (
              <Pressable style={styles.modalOption} onPress={() => handleImageAction(removeProfileImage)} accessibilityRole="button">
                <Ionicons name="trash-outline" size={24} color={colors.primary} />
                <Text style={styles.removeText}>{t('settings.removePhoto')}</Text>
              </Pressable>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  content: { flexGrow: 1 },
  title: { color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: colors.mutedText, fontSize: 16, marginBottom: 24 },
  profileImageSection: { alignItems: 'center', marginBottom: spacing.lg },
  avatarWrapper: { height: 108, width: 108 },
  avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 48, height: 96, justifyContent: 'center', overflow: 'hidden', width: 96 },
  avatarImage: { height: '100%', width: '100%' },
  avatarText: { color: colors.white, fontSize: 28, fontWeight: '700' },
  cameraButton: { alignItems: 'center', backgroundColor: colors.secondary, borderColor: colors.white, borderRadius: 18, borderWidth: 2, bottom: 6, height: 36, justifyContent: 'center', position: 'absolute', right: 6, width: 36 },
  removeText: { color: colors.primary, fontSize: 16, marginLeft: spacing.md },
  statusText: { color: colors.mutedText, marginBottom: spacing.md },
  modalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.45)', flex: 1, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg, width: '100%' },
  modalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  modalTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  modalOption: { alignItems: 'center', flexDirection: 'row', paddingVertical: spacing.md },
  modalOptionText: { color: colors.text, fontSize: 16, marginLeft: spacing.md },
})
