<template>
  <b-container class="container">
    <AlertMsg></AlertMsg>
    <Login v-if="$store.state.nwugrade.token === ''"></Login>
    <StudyState class="more-space"></StudyState>
  </b-container>
</template>

<script>
  import AlertMsg from '../AlertMsg'
  import Login from '../Login'
  import StudyState from '../StudyState'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  // 学习状态组件，包含三个子组件
  export default {
    name: 'MainStudyState',
    components: {StudyState, Login, AlertMsg},
  }
</script>

<style scoped>

</style>
