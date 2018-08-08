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
        showLoading: false,
        loadingLabel: 'loading',
        overlay: true
      }
    },
    created() {
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
