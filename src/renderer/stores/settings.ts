import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

// Get settings from default electron store
const settings = await window.mainApi.invoke('msgGetStoreValue', 'settings')

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: settings.locale,
    theme: settings.theme,
  }),
  getters: {
    getSettings: async (state) => {
      const settings = await window.mainApi.invoke('msgGetStoreValue', 'settings')
      return settings
    },
  },
  actions: {
    setInitialSettings() {
      const theme = useTheme()
      theme.global.name.value = this.theme
      const { locale } = useI18n()
      locale.value = this.locale
    },
    async updateSettings(key: string, value: any) {
      // Update state
      this[key] = value
      // Send modification to main process to update electron store
      await window.mainApi.invoke('msgSetStoreValue', key, value)
    },
  },
})
