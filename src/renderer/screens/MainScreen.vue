<script setup lang="tsx">
import { useTheme } from 'vuetify'
import { openExternal } from '@/renderer/utils'
import { useCounterStore } from '@/renderer/stores/counter'
import { useSettingsStore } from '@/renderer/stores/settings'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { counterIncrease } = useCounterStore()
const { counter } = storeToRefs(useCounterStore())
const settingsStore = useSettingsStore()
const theme = useTheme()
const appVersion = ref('Unknown')

onMounted((): void => {
  // Get application version from package.json version string (Using IPC communication)
  window.mainApi.receive('msgReceivedVersion', (event: Event, version: string) => {
    appVersion.value = version
  })
  window.mainApi.send('msgRequestGetVersion')
})

const handleChangeTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const handleGitHub = async (): Promise<void> => {
  await openExternal('https://github.com/Prikers/piclab')
}

const handleCountIncrease = (): void => {
  counterIncrease(1)
}

const SetNewSettings = async (): Promise<void> => {
  settingsStore.updateSettings('theme', 'dark')
  settingsStore.updateSettings('locale', 'fr')
}
</script>

<template>
  <v-container>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5">
        <img alt="logo" draggable="false" class="ma-auto h-auto w-75" src="/images/logo.webp" />
      </v-col>
      <v-col cols="12" md="7">
        <h2 class="my-4">{{ $t('desc.welcome-title') }}</h2>
        <p>{{ $t('desc.welcome-desc') }}</p>
        <p class="my-4"
          >App Version: <strong>{{ appVersion }}</strong></p
        >
        <v-row class="my-4">
          <v-col cols="3">
            <v-btn icon color="primary" @click="handleChangeTheme">
              <v-icon icon="mdi-brightness-6" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.change-theme') }}
              </v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-badge color="blue" :content="counter">
              <v-btn icon color="primary" @click="handleCountIncrease">
                <v-icon icon="mdi-plus-circle" />
                <v-tooltip activator="parent" location="bottom">
                  {{ $t('menu.increase-count') }}
                </v-tooltip>
              </v-btn>
            </v-badge>
          </v-col>
          <v-col cols="3">
            <v-btn icon color="primary" @click="handleGitHub">
              <v-icon icon="mdi-github" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.github') }}
              </v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn icon color="primary" @click="SetNewSettings">
              <v-icon icon="mdi-cog" />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
