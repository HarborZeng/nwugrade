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
    computed: {
      studyState: {
        get: function () {
          return this.$store.state.nwugrade.studyState
        },
        set: function (newValue) {

        }
      }
    },
    methods: {
      queryStudyState() {
        bus.$emit("showLoading", "加载中...", true)
        fetch(this.$store.state.webserver.tellyouwhat_host +
          '/university-facade/MyUniversity/StudyState?token=' +
          this.$store.state.nwugrade.token)
          .then(response => response.json())
          .then(json => {
            // 与服务器通信成功
            if (json.state === 200) {
              // 获取成功
              this.$store.commit("saveStudyState", json.data)
            } else {
              // token失效，提示重新登录
              if (json.state === 2003) {
                this.$store.commit("resetAllNwuData")
              }
              bus.$emit("showDialog", json.message, "查询你的状态出错了")
            }
            bus.$emit("loadingFinished")
          })
          .catch(e => {
            if (error.message === "Network Error") {
              bus.$emit("showDialog", "学校的服务器又挂了", "请稍候重试...")
            } else {
              bus.$emit("showDialog", e, "查询你的状态出错了")
            }
            bus.$emit("loadingFinished")
          })
      }
    },
    created() {
      //当监听到loginFinished事件时查询一下成绩
      bus.$on("loginFinished", () => {
        this.queryStudyState()
      })

      bus.$on("refreshRequested", () => {
        if (this.$store.state.nwugrade.token !== '') {
          //登录过，有token，但是没有查过学习状态
          this.queryStudyState()
        }
      })

      if (this.$store.state.nwugrade.token !== '') {
        //登录过，有token，但是没有查过学习状态
        this.queryStudyState()
      }
    },
  }
</script>

<style scoped>

</style>
