import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '@service-penelopec/profileService'
import { DEFAULT_USER_PROFILE, type UserProfile } from './ProfileModel'

export function useProfileViewModel() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [successMessage, setSuccessMessage] = useState<string | undefined>()

  const loadProfile = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    try {
      setProfile(await getUserProfile())
    } catch {
      setError('Não foi possível carregar o perfil. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProfile()
  }, [loadProfile])

  const updateField = useCallback((field: 'name' | 'email' | 'birthDate', value: string) => {
    setError(undefined)
    setSuccessMessage(undefined)
    setProfile((current) => ({ ...current, [field]: value }))
  }, [])

  const selectProfileImage = useCallback(async (source: 'camera' | 'gallery') => {
    setError(undefined)
    setSuccessMessage(undefined)

    try {
      const permission = source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permission.granted) {
        setError(source === 'camera' ? 'Permita o acesso à câmera para tirar uma foto.' : 'Permita o acesso às fotos para escolher uma imagem.')
        return
      }

      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        })
        : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          })

      if (!result.canceled) {
        setProfile((current) => ({ ...current, profileImage: result.assets[0].uri }))
      }
    } catch {
      setError(source === 'camera' ? 'Não foi possível tirar a foto.' : 'Não foi possível selecionar a imagem.')
    }
  }, [])

  const pickProfileImage = useCallback(() => selectProfileImage('gallery'), [selectProfileImage])
  const takeProfileImage = useCallback(() => selectProfileImage('camera'), [selectProfileImage])

  const removeProfileImage = useCallback(() => {
    setError(undefined)
    setSuccessMessage(undefined)
    setProfile((current) => ({ ...current, profileImage: null }))
  }, [])

  const saveProfile = useCallback(async () => {
    setIsSaving(true)
    setError(undefined)
    setSuccessMessage(undefined)

    try {
      const savedProfile = await updateUserProfile(profile)
      setProfile(savedProfile)
      setSuccessMessage('Alterações salvas com sucesso.')
      return true
    } catch {
      setError('Não foi possível salvar as alterações. Tente novamente.')
      return false
    } finally {
      setIsSaving(false)
    }
  }, [profile])

  return {
    profile,
    isLoading,
    isSaving,
    error,
    successMessage,
    updateField,
    pickProfileImage,
    takeProfileImage,
    removeProfileImage,
    saveProfile,
    loadProfile,
  }
}