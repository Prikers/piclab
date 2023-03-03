<script setup lang="tsx">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import NavigationDrawer from '@/renderer/components/layout/NavigationDrawer.vue'
import SettingsDrawer from '@/renderer/components/layout/SettingsDrawer.vue'
</script>

<template>
  <v-app>
    <v-layout>
      <HeaderLayout />
      <NavigationDrawer />
      <SettingsDrawer />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
