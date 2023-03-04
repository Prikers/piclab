<script setup lang="tsx">
import { openExternal } from '@/renderer/utils'
import { onMounted, ref } from 'vue'

const appVersion = ref('Unknown')

onMounted((): void => {
  // Get application version from package.json version string (Using IPC communication)
  window.mainApi.receive('msgReceivedVersion', (event: Event, version: string) => {
    appVersion.value = version
  })
  window.mainApi.send('msgRequestGetVersion')
})

const handleGitHub = async (): Promise<void> => {
  await openExternal('https://github.com/Prikers/piclab')
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
          <v-col cols="12">
            <v-btn icon color="primary" @click="handleGitHub">
              <v-icon icon="mdi-github" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.github') }}
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
