import Vue from 'vue'
import Router from 'vue-router'
import grade from '@/components/grade'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'grade',
      component: grade
    }
  ]
})
