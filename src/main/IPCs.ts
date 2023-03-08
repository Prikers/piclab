import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import Constants from './utils/Constants'
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

    ipcMain.handle('msgSetStoreValue', (event, key: string, value: any) => {
      store.set(`settings.${key}`, value)
    })

    ipcMain.handle('msgOpenDialogPickFolder', async (event) => {
      const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
      window.webContents.send('msgPickedFolder', result)
    })
  }
}
