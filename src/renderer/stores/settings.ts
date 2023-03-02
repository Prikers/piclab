import { defineStore } from 'pinia'

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
    }
  },
  actions: {
    async updateSettings(key: string, value: any) {
      // Update state
      this[key] = value
      console.log('From Store', this.locale, this.theme)
      // Send modification to main process to update electron store
      await window.mainApi.invoke('msgSetStoreValue', key, value)
    }
  },
})