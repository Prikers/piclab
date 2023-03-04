import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import { MainScreen, DeduplicationScreen, ErrorScreen, GalleryScreen } from '@/renderer/screens'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainScreen,
      meta: {
        titleKey: 'title.main',
      },
    },
    {
      path: '/gallery',
      component: GalleryScreen,
      meta: {
        titleKey: 'title.gallery',
      },
    },
    {
      path: '/deduplication',
      component: DeduplicationScreen,
      meta: {
        titleKey: 'title.deduplication',
      },
    },
    {
      path: '/error',
      component: ErrorScreen,
      meta: {
        titleKey: 'title.error',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
