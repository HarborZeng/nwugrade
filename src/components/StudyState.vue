<template>
  <div class="col-md-6 card harbor-padding">
    <h4>学习状态</h4>
    <hr/>
    <span v-html="studyState"></span>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import bus from '../bus/bus'

  export default {
    name: 'StudyState',
    data() {
      return {
        studyState: Object.keys(this.$store.state.nwugrade.studyState).length === 0 ?
          {"k":"msg", "v":"暂无"} :
          this.$store.state.nwugrade.studyState,
      }
    },
    methods: {
      queryStudyState() {
        bus.$emit("showLoading", "加载中...", true)
        fetch(this.$store.state.webserver.nwu_host +
          '/university-facade/MyUniversity/StudyState?token=' +
          this.$store.state.nwugrade.token)
          .then(response => response.json())
          .then(json => {
            // 与服务器通信成功
            if (json.state === 200) {
              // 服务器返回数据没有异常
              // 把查出来的学习状态json对象赋给学习状态studyState
              this.studyState = json.data
              this.$store.commit("saveStudyState", this.studyState)
            } else {
              bus.$emit("showDialog", json.message, "查询你的状态出错了")
            }
            bus.$emit("loadingFinished")
          })
          .catch(e => {
            bus.$emit("showDialog", e, "查询你的状态出错了")
            bus.$emit("loadingFinished")
          })
      }
    },
    created() {
      //当监听到loginFinished事件时查询一下成绩
      bus.$on("loginFinished", () => {
        this.queryStudyState()
      })

      bus.$on("loginExit", () => {
        this.studyState = ''
      })

      if (this.$store.state.nwugrade.token !== '' &&
        Object.keys(this.$store.state.nwugrade.studyState).length === 0) {
        //登录过，有token，但是没有查过学习状态
        this.queryStudyState()
      }
    },
  }
</script>

<style scoped>

</style>
