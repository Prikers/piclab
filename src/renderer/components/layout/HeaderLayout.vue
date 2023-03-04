<script setup lang="tsx">
import { useAnimationStore } from '@/renderer/stores/animation'
const animationStore = useAnimationStore()
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-title class="marker">Piclab</v-app-bar-title>
    <template #append>
      <v-btn
        icon="mdi-cog"
        @click="animationStore.showOrHideSettingsDrawer">
      </v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>
.v-btn {
  opacity: 0.5;
}
</style>
