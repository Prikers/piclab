import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { glob } from 'glob'

import Constants from './utils/Constants'
import { Photo } from './utils/interfaces'
import store from './utils/store'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // Get application version
    ipcMain.on('msgRequestGetVersion', () => {
      window.webContents.send('msgReceivedVersion', Constants.APP_VERSION)
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event, url: string) => {
      await shell.openExternal(url)
    })

    // Get info from default store
    ipcMain.handle('msgGetStoreValue', (event, key: string) => {
      return store.get(key)
    })

    // Set info to default store
    ipcMain.handle('msgSetStoreValue', (event, key: string, value: any) => {
      store.set(`settings.${key}`, value)
    })

    // Create project
    ipcMain.handle('msgOpenDialogPickFolder', async (event) => {
      const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
      if (!result.canceled) {
        store.set('project.created', true)
        store.set('project.folder', result.filePaths[0])
      }
      window.webContents.send('msgPickedFolder', result)
    })

    // Start project
    ipcMain.handle('msgCreateProject', async (event, folder: string, algoString: string) => {
      // Algorithms
      let algorithms: string[] = JSON.parse(algoString)
      store.set('project.algorithms', algorithms)
      // Glob all photos and save to store
      const photosPaths = await glob('**/*.{' + Constants.IMAGE_TYPES.join(',') + '}', {
        stat: true,
        withFileTypes: true,
        cwd: folder,
      })
      const photos: Photo[] = photosPaths.map((photo) => {
        return {
          name: photo.name,
          fullname: photo.fullpath(),
          parent: photo.parent?.name,
          size: photo.size,
          mtime: photo.mtime,
          mode: photo.mode,
        }
      })
      store.set('project.data', photos)
    })

  }
}
