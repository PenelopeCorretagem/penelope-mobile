import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '@service-penelopec/profileService'
import { DEFAULT_USER_PROFILE, type UserProfile, validateUserProfile } from './ProfileModel'

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
      setError('settings.profileErrors.load')
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
        setError(source === 'camera' ? 'settings.profileErrors.cameraPermission' : 'settings.profileErrors.galleryPermission')
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
      setError(source === 'camera' ? 'settings.profileErrors.cameraFailed' : 'settings.profileErrors.galleryFailed')
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
    const validationError = validateUserProfile(profile)
    if (validationError) {
      setError(validationError)
      setSuccessMessage(undefined)
      return false
    }

    setIsSaving(true)
    setError(undefined)
    setSuccessMessage(undefined)

    try {
      const savedProfile = await updateUserProfile(profile)
      setProfile(savedProfile)
      setSuccessMessage('settings.profileSuccess')
      return true
    } catch {
      setError('settings.profileErrors.save')
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