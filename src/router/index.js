import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: (to) => {
        return { path: '/pokemongallary/1' }
      }
    },
    {
      path: '/pokemongallary/:page',
      name: 'pokemongallary',
      component: () => import('../views/PokemonGallaryView.vue')
    },
    {
      path: '/pokemongallary/',
      redirect: (to) => {
        return { path: '/pokemongallary/1' }
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
    }
  ]
})

export default router
