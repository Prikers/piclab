<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleRoute = (path: string): void => {
  router.push(path)
}
const isCurrentRoute = (path: string): boolean => {
  return path === route.path
}
</script>

<template>
  <v-navigation-drawer location="left" permanent expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        :title="$t('title.main')"
        value="dashboard"
        :active="isCurrentRoute('/')"
        @click="handleRoute('/')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-image-multiple"
        :title="$t('title.gallery')"
        value="gallery"
        :active="isCurrentRoute('/gallery')"
        @click="handleRoute('/gallery')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-book-remove-multiple"
        :title="$t('title.deduplication')"
        value="deduplication"
        :active="isCurrentRoute('/deduplication')"
        @click="handleRoute('/deduplication')"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
