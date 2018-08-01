import Vue from 'vue'
import Router from 'vue-router'
import GradeSPA from '@/components/Main'
import Error from '@/components/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'gradeSPA',
      component: GradeSPA
    },
    {
      path: '*',
      component: Error
    }
  ]
})
