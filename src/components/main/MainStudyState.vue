<template>
  <div class="container">
    <AlertMsg></AlertMsg>
    <Login></Login>
    <StudyState></StudyState>
  </div>
</template>

<script>
  import AlertMsg from '../AlertMsg'
  import Login from '../Login'
  import StudyState from '../StudyState'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'MainStudyState',
    components: {StudyState, Login, AlertMsg}
  }
</script>

<style scoped>

</style>
