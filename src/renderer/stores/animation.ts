import { defineStore } from 'pinia'

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    settingsDrawer: false,
    dialogs: {
      startConfiguration: false,
    },
  }),
  getters: {
    dialogStartConfiguration: (state) => state.dialogs.startConfiguration,
  },
  actions: {
    showOrHideSettingsDrawer() {
      this.settingsDrawer = !this.settingsDrawer
    },
    showOrHideDialog(whichDialog: string, show: boolean) {
      this.dialogs[whichDialog] = show
    },
  },
})
