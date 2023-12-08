import { createRouter, createWebHistory } from 'vue-router'

export const Routes = {
  HOME: {
    name: 'home',
    path: '/'
  },
  USERS: {
    name: 'users',
    path: '/users'
  },
  USER_UPDATE: {
    name: 'user-update',
    path: '/users/:id'
  },
  USER_CREATE: {
    name: 'user-create',
    path: '/users/create'
  }
}

const routes = [
  {
    path: Routes.HOME.path,
    name: Routes.HOME.name,
    component: () => import('@/views/UserList.vue')
  },
  {
    path: Routes.USERS.path,
    name: Routes.USERS.name,
    component: () => import('@/views/UserList.vue')
  },
  {
    path: Routes.USER_UPDATE.path,
    name: Routes.USER_UPDATE.name,
    component: () => import('@/views/UserUpdate.vue')
  },
  {
    path: Routes.USER_CREATE.path,
    name: Routes.USER_CREATE.name,
    component: () => import('@/views/UserCreate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
