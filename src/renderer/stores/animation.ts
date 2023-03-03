import { defineStore } from 'pinia'

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    settingsDrawer: false,
  }),
  getters: {},
  actions: {
    showOrHideSettingsDrawer() {
      this.settingsDrawer = !this.settingsDrawer
    }
  },
})