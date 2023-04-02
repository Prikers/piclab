<script setup lang="tsx">
import type { OpenDialogReturnValue } from 'electron'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useAnimationStore } from '@/renderer/stores/animation'
import { useProjectStore } from '@/renderer/stores/project'

const animationStore = useAnimationStore()
const projectStore = useProjectStore()
const { dialogStartConfiguration } = storeToRefs(animationStore)
const { folder, selectedAlgorithms } = storeToRefs(projectStore)
const step = ref(1)

const handleDialogPickFolder = async () => {
  await window.mainApi.invoke('msgOpenDialogPickFolder')
}

const handleProjectValidation = async () => {
  animationStore.showOrHideDialog('startConfiguration', false)
  await window.mainApi.invoke(
    'msgCreateProject',
    folder.value,
    JSON.stringify(selectedAlgorithms.value)
  )
}

onMounted((): void => {
  window.mainApi.receive('msgPickedFolder', (event: Event, result: OpenDialogReturnValue) => {
    if (!result.canceled) {
      folder.value = result.filePaths[0]
      step.value = 2
    }
  })
})
</script>

<template>
  <v-btn
    size="x-large"
    color="primary"
    @click="animationStore.showOrHideDialog('startConfiguration', true)"
    >{{ $t('main.start-btn') }}</v-btn
  >
  <v-dialog v-model="dialogStartConfiguration" width="auto" persistent>
    <v-card>
      <v-card-text>
        <v-timeline align="start" side="end">
          <!-- Pick the project folder -->
          <v-timeline-item icon="mdi-numeric-1" dot-color="primary">
            {{ $t('projectConfiguration.step-1') }}
            <div class="text-center my-6">
              <v-btn color="primary" @click="handleDialogPickFolder">Pick A Folder</v-btn>
              <div class="mt-4">{{ folder }}</div>
            </div>
          </v-timeline-item>
          <v-timeline-item v-if="step > 1" icon="mdi-numeric-2" dot-color="primary">
            {{ $t('projectConfiguration.step-2') }}
            <v-checkbox
              v-for="(val, algorithm, index) in projectStore.algorithms"
              :key="index"
              v-model="selectedAlgorithms"
              density="compact"
              multiple
              hide-details
              :label="$t('projectConfiguration.algorithms.' + algorithm)"
              :value="algorithm"
            >
            </v-checkbox>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="secondary"
          @click="animationStore.showOrHideDialog('startConfiguration', false)"
          >{{ $t('commons.cancel') }}</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          v-if="step > 1"
          color="primary"
          variant="outlined"
          @click="handleProjectValidation"
          >{{ $t('commons.validate') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
