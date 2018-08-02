import Vue from 'vue'
import Router from 'vue-router'
import StudyStateSPA from '@/components/main/MainStudyState'
import GradesSPA from '@/components/main/MainGrades'
import Error from '@/components/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'studyStateSPA',
      component: StudyStateSPA
    },
    {
      path: '/grade',
      name: 'gradesSPA',
      component: GradesSPA
    },
    {
      path: '*',
      component: Error
    }
  ]
})
