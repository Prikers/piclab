<script setup lang="tsx">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import SettingsDrawer from './SettingsDrawer.vue'
</script>

<template>
  <v-app>
    <v-layout>
      <HeaderLayout />
      <SettingsDrawer />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
