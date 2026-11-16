import { useCallback, useMemo, useState } from 'react'
import i18n from '../../../../../i18n'

export function useSettingsViewModel() {
  const [isLanguageListOpen, setIsLanguageListOpen] = useState(false)

  const supportedLanguages = useMemo(
    () => Object.keys(i18n.options.resources ?? {}),
    [],
  )
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).split('-')[0]

  const toggleLanguageList = useCallback(() => {
    setIsLanguageListOpen((isOpen) => !isOpen)
  }, [])

  const selectLanguage = useCallback((language: string) => {
    setIsLanguageListOpen(false)
    void i18n.changeLanguage(language)
  }, [])

  return {
    activeLanguage,
    isLanguageListOpen,
    selectLanguage,
    supportedLanguages,
    toggleLanguageList,
  }
}
