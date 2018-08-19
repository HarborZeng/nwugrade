<template>
  <loading
    :show="showLoading"
    :label="loadingLabel"
    :overlay="overlay">
  </loading>
</template>

<script>
  import loading from 'vue-full-loading'
  import bus from '../bus/bus'

  export default {
    name: "Loading",
    components: {
      loading
    },
    data() {
      return {
        /**
         * 展示加载框与否
         */
        showLoading: false,
        /**
         * 加载时展示的文案
         */
        loadingLabel: 'loading',
        /**
         * 加载的时候会有白色覆盖页面与否
         */
        overlay: true
      }
    },
    created() {
      /**
       * 在初始化这个组件的时候，就注册2个事件
       */
      bus.$on("showLoading", (loadingMessage, overlay) => {
        this.loadingLabel = loadingMessage
        this.showLoading = true
        this.overlay = overlay
      }).$on("loadingFinished", () => {
        this.showLoading = false
      })
    }
  }
</script>

<style scoped>

</style>
