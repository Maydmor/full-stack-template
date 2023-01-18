import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            loginRequired: true
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            loginRequired: true
          }
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('../views/AuthenticationView.vue'),
        },
        {
          path: '/activate/:email',
          name: 'activation',
          component: () => import('../views/AccountActivationView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if(to.meta?.loginRequired) {
    if(!useAuthStore().isLoggedIn) {
      return { name: 'auth' }
    }
  }
})

export default router
