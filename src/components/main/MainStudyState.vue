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

  export default {
    name: 'MainStudyState',
    components: {StudyState, Login, AlertMsg},
    methods: {
      a() {
        fetch('http://ydjw.nwu.edu.cn/university-facade/MyUniversity/StudyState?token=' + response.data.data.token)
          .then(response => response.json())
          .then(json => {
            // 与服务器通信成功
            if (json.state === 200) {
              // 服务器返回数据没有异常
              // 把查出来的学习状态json对象赋给学习状态studyState
              this.studyState = json.data
            } else {
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
