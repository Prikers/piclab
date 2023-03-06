<script setup lang="tsx">

import { storeToRefs } from 'pinia'
import { useAnimationStore } from '@/renderer/stores/animation'

const animationStore = useAnimationStore()
const { dialogStartConfiguration } = storeToRefs(animationStore)

</script>

<template>
  <v-btn size="x-large" color="primary" @click="animationStore.showOrHideDialog('startConfiguration', true)">{{ $t('main.start-btn') }}</v-btn>
  <v-dialog v-model="dialogStartConfiguration" width="auto">
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="animationStore.showOrHideDialog('startConfiguration', false)">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
