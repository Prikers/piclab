<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useAnimationStore } from '@/renderer/stores/animation'

const { locale, availableLocales } = useI18n()

const theme = useTheme()
const { settingsDrawer } = storeToRefs(useAnimationStore())
const languages = ref(['en'])

const handleChangeTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const handleChangeLanguage = (val: string): void => {
  locale.value = val
}

onMounted((): void => {
  languages.value = availableLocales
})
</script>

<template>
  <v-navigation-drawer
    v-model="settingsDrawer"
    temporary
    location="right"
  >
    <!-- Theme -->
    <v-row class="mx-2 mt-2 align-center">
      <v-col cols="4">
        <h4>{{ $t('settings.theme-title') }}</h4>
      </v-col>
      <v-col cols="8">
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
      <v-col cols="4">
        <h4>{{ $t('settings.locale-title') }}</h4>
      </v-col>
      <v-col cols="8">
        <v-select
          :model-value="locale"
          density="compact"
          :items="languages"
          @update:model-value="handleChangeLanguage"
        >
        </v-select>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
