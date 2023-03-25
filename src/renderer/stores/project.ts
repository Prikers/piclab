import { defineStore } from 'pinia'

// Get project information from electron store
const project = await window.mainApi.invoke('msgGetStoreValue', 'project')
const algorithms = {
  'duplicate': {
    default: true,
  },
  'qualityWarning': {
    default: true,
  },
  'smilesDetection': {
    default: true,
  },
  'redEyesDetection':{
    default: true,
  },
  'faceDetection': {
    default: false,
  },
  'faceRecognition': {
    default: false,
  },
}
const defaultAlgorithms = Object.keys(algorithms).filter((key) => algorithms[key].default)

export const useProjectStore = defineStore('project', {
  state: () => ({
    created: project.created as boolean,
    folder: project.folder as string,
    algorithms: project.algorithms as typeof algorithms || algorithms,
    selectedAlgorithms: defaultAlgorithms as string[],
  }),
  actions: {
    setProjectFolder(folder: string) {
      this.folder = folder
    },
  },
})
