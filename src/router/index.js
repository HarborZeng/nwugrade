import Vue from 'vue'
import Router from 'vue-router'
import Grade from '@/components/grade'
import Error from '@/components/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'grade',
      component: Grade
    },
    {
      path: '*',
      component: Error
    }
  ]
})
