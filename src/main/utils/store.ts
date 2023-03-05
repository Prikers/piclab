import Store from 'electron-store'

// Default config store
const schema = {
  settings: {
    type: 'object',
    properties: {
      locale: {
        type: 'string',
      },
      theme: {
        type: 'string',
      },
    },
  },
} as any
const store = new Store({ schema })

// Initialize with default values for new users
if (!store.get('settings')) {
  store.set('settings', {
    locale: 'fr',
    theme: 'dark',
  })
}

export default store
