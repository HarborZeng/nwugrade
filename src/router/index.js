import Vue from 'vue'
import Router from 'vue-router'
import StudyStateSPA from '@/components/main/MainStudyState'
import GradesSPA from '@/components/main/MainGrades'
import NextTermLessonsSPA from '@/components/main/MainNextTermLessons'
import MyLessonsSPA from '@/components/main/MainMyLessons'
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
      path: '/nextTermLessons',
      name: 'NextTermLessonsSPA',
      component: NextTermLessonsSPA
    },
    {
      path: '/myLessons',
      name: 'MyLessonsSPA',
      component: MyLessonsSPA
    },
    {
      path: '*',
      component: Error
    }
  ]
})
