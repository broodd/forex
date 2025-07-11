import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEn from './app/translations/en.json'
import storage, { LANG_KEY } from './shared/utils/storage'

const resources = {
  en: {
    translation: translationEn,
  },
}

const savedLanguage = storage.getFromStorage(LANG_KEY) || 'en'

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: 'en',
  resources,
})

export default i18n

if (!storage.getFromStorage(LANG_KEY)) {
  storage.setToStorage(LANG_KEY, 'en')
}
