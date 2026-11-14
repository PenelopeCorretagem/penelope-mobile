import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'
import pt from './idiomas/pt.json'
import en from './idiomas/en.json'

const deviceLanguage = getLocales()[0]?.languageCode?.toLowerCase().split('-')[0]

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    lng: deviceLanguage === 'pt' || deviceLanguage === 'en' ? deviceLanguage : 'en',
    interpolation: { escapeValue: false },
    resources: { pt: { translation: pt }, en: { translation: en } },
  })

export default i18n
