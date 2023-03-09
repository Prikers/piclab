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
  project: {
    type: 'object',
    properties: {
      created: {
        type: 'boolean',
      },
      folder: {
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
  store.set('project', {
    created: false,
  })
}

export default store
