import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: (to) => {
        return { path: '/pokemongalary/1' }
      }
    },
    {
      path: '/pokemongalary/:page',
      name: 'pokemongalary',
      component: () => import('../views/PokemonGalaryView.vue')
    },
    {
      path: '/pokemongalary/',
      redirect: (to) => {
        return { path: '/pokemongalary/1' }
      }
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue')
    },
    {
      path: '/pokemon/',
      redirect: (to) => {
        return { path: '/pokemon/1' }
      }
    },
    {
      path: '/move/:id',
      name: 'move',
      component: () => import('../views/MoveView.vue')
    },
    {
      path: '/notvaild',
      name: 'notvaild',
      component: () => import('../views/NotVaild.vue')
    },
    {
      path: '/creatuser',
      name: 'creatuser',
      component: () => import('../views/CreatUserView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    }
  ]
})

export default router
