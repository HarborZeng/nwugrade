<template>
  <b-container class="container">
    <AlertMsg></AlertMsg>
    <Login v-if="$store.state.nwugrade.token === ''"></Login>
    <Grade class="more-space"></Grade>
  </b-container>
</template>

<script>
  import AlertMsg from '../AlertMsg'
  import Login from '../Login'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Grade from "../Grade";

  // 成绩主组件，包含3个子组件
  export default {
    name: 'MainGrades',
    components: {Grade, Login, AlertMsg}
  }
</script>

<style>

</style>
