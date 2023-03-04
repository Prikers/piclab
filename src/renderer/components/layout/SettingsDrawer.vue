<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useAnimationStore } from '@/renderer/stores/animation'
import { openExternal } from '@/renderer/utils'

const { locale, availableLocales } = useI18n()

const theme = useTheme()
const { settingsDrawer } = storeToRefs(useAnimationStore())
const appVersion = ref('Unknown')
const languages = ref(['en'])

const handleChangeTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const handleChangeLanguage = (val: string): void => {
  locale.value = val
}
const handleGitHub = async (): Promise<void> => {
  await openExternal('https://github.com/Prikers/piclab')
}

onMounted((): void => {
  languages.value = availableLocales
    // Get application version from package.json version string (Using IPC communication)
    window.mainApi.receive('msgReceivedVersion', (event: Event, version: string) => {
    appVersion.value = version
  })
  window.mainApi.send('msgRequestGetVersion')
})
</script>

<template>
  <v-navigation-drawer
    v-model="settingsDrawer"
    temporary
    width="320"
    location="right"
  >
    <!-- Theme -->
    <v-row class="mx-2 mt-2 align-center">
      <v-col cols="6">
        <h4>{{ $t('settings.theme-title') }}</h4>
      </v-col>
      <v-col cols="6">
        <v-switch hide-details inset @click="handleChangeTheme">
          <template #prepend>
            <v-icon icon="mdi-white-balance-sunny"></v-icon>
          </template>
          <template #append>
            <v-icon icon="mdi-weather-night"></v-icon>
          </template>
        </v-switch>
      </v-col>
    </v-row>
    <!-- Locale -->
    <v-row class="mx-2 mt-2 align-center">
      <v-col cols="6">
        <h4>{{ $t('settings.locale-title') }}</h4>
      </v-col>
      <v-col cols="6">
        <v-select
          :model-value="locale"
          density="compact"
          :items="languages"
          @update:model-value="handleChangeLanguage"
        >
        </v-select>
      </v-col>
    </v-row>
    <!-- Github access -->
    <v-row class="mx-2 mt-2 align-center">
      <v-col cols="6">
        <h4>{{ $t('settings.github') }}</h4>
      </v-col>
      <v-col cols="6">
        <v-btn icon @click="handleGitHub">
          <v-icon icon="mdi-github" />
        </v-btn>
      </v-col>
    </v-row>

    <template #append>
      <v-row class="mx-2 mb-2 align-center">
        <v-col cols="6">
          <h4>{{ $t('settings.version') }}</h4>
        </v-col>
        <v-col cols="6">
          <strong>{{ appVersion }}</strong>
        </v-col>
      </v-row>
    </template>

  </v-navigation-drawer>
</template>
