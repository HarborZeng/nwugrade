<template>
  <b-container class="container">
    <AlertMsg></AlertMsg>
    <Login v-if="$store.state.nwugrade.token === ''"></Login>
    <Grade></Grade>
  </b-container>
</template>

<script>
  import AlertMsg from '../AlertMsg'
  import Login from '../Login'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Grade from "../Grade";

  export default {
    name: 'MainGrades',
    components: {Grade, Login, AlertMsg}
  }
</script>

<style scoped>

</style>
