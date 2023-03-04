import { createVuetify } from 'vuetify'
import { en, fr } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

import colors from 'vuetify/lib/util/colors.mjs'

export default createVuetify({
  locale: {
    messages: { en, fr },
    locale: 'en',
    fallback: 'en',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.base,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.teal.darken1,
        },
      },
    },
  },
})
