import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginPage from './views/LoginPage'
import Timeline from './views/Timeline'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: 'login',
      name: 'login_page',
      component: LoginPage
    },
    {
      path: 'timeline',
      name: 'timeline',
      component: Timeline
    }
  ]
})
