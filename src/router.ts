import { createRouter, createWebHistory } from 'vue-router'
import PhotoGallery from './components/PhotoGallery.vue'
import PhotoDetail from './components/PhotoDetails.vue'
import PhotoEdit from './components/PhotoEdit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PhotoGallery },
    { path: '/photos/:id', component: PhotoDetail },
    { path: '/photos/:id/edit', component: PhotoEdit },
  ],
})

export default router