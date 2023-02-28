import { createI18n } from 'vue-i18n'
import en from '@/renderer/locales/en.json'
import fr from '@/renderer/locales/fr.json'
import { getCurrentLocale } from '@/renderer/utils'

export default createI18n({
  legacy: false,
  locale: getCurrentLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    fr,
  }
})
