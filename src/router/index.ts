import { createRouter, createWebHashHistory } from 'vue-router'
import userStore from '@/store/modules/userModules'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/home/index.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/pages/category/index.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/pages/search/index.vue')
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/pages/video/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('@/pages/register/index.vue')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const store = userStore()
  if(store.getTokenInfo) {
    if(to.fullPath === '/login' || to.fullPath === '/regist') {
      return
    }else {
      next()
    }
  }else {
    if(to.fullPath === '/login') {
      next()
    } else if (to.fullPath === '/regist') {
      next()
    }else {
      next('/login')
    }
  }
})

export default router