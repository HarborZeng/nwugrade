<template>
  <b-alert variant="danger"
           dismissible
           :show="showDismissibleAlert"
           @dismissed="showDismissibleAlert=false">
    <strong>{{msg}}</strong>
  </b-alert>
</template>

<script>
  export default {
    name: 'AlertMsg',
    data() {
      return {
        msg: "此网页表现和m西北大学软件一致，并不能提前查成绩，请悉知",
        showDismissibleAlert: true
      }
    }
  }
</script>

<style scoped>

</style>
