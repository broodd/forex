import 'react-i18next'

import en from './app/translations/en.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    resources: {
      en: typeof en
    }
  }
}
