import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import ProfileView from '@/views/ProfileView.vue'
import GalleryView from '@/views/GalleryView.vue'
import GameOverView from '@/views/GameOverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/play',
      name: 'play',
      component: GameView,
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: ProfileView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOverView,
    },
  ],
})

export default router
