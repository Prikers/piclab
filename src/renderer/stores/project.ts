import { defineStore } from 'pinia'

// Get project information from electron store
const project = await window.mainApi.invoke('msgGetStoreValue', 'project')

export const useProjectStore = defineStore('project', {
  state: () => ({
    created: project.created,
    folder: project.folder,
  }),
  actions: {
    async setProjectFolder(folder: string) {
      this.folder = folder
    },
  },
})
