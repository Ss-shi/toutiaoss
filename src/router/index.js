import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import login from '../views/login'
import Home2 from '../views/home/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '',
        component: Home2
      }, {
        path: 'comment',
        component: () => import('../views/common')
      }, {
        path: 'material',
        component: () => import('../views/material')
      }, {
        path: 'articles',
        component: () => import('../views/article')
      }, {
        path: 'publish',
        component: () => import('../views/publish')
      }, {
        path: 'publish/:articleId',
        component: () => import('../views/publish')
      }, {
        path: 'userinfo',
        component: () => import('../views/userinfo')
      } ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
