<script setup lang="tsx">

import type { OpenDialogReturnValue } from 'electron'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useAnimationStore } from '@/renderer/stores/animation'
import { useProjectStore } from '@/renderer/stores/project'

const animationStore = useAnimationStore()
const projectStore = useProjectStore()
const { dialogStartConfiguration } = storeToRefs(animationStore)
const { folder } = storeToRefs(projectStore)

const handleDialogPickFolder = async () => {
  await window.mainApi.invoke('msgOpenDialogPickFolder')
}

onMounted((): void => {
  window.mainApi.receive('msgPickedFolder', (event: Event, result: OpenDialogReturnValue) => {
    if (!result.canceled) {
      folder.value = result.filePaths[0]
    }
  })
})

</script>

<template>
  <v-btn size="x-large" color="primary" @click="animationStore.showOrHideDialog('startConfiguration', true)">{{ $t('main.start-btn') }}</v-btn>
  <v-dialog v-model="dialogStartConfiguration" width="auto" persistent>
    <v-card>
      <v-card-text>
        {{ $t('projectConfiguration.description') }}
        <div class="text-center my-6">
          <v-btn color="primary" @click="handleDialogPickFolder">Pick A Folder</v-btn>
        </div>
        {{ folder }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="animationStore.showOrHideDialog('startConfiguration', false)">{{ $t('commons.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
