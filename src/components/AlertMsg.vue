<template>
  <div class="alert alert-warning">
    <a href="#" class="close" data-dismiss="alert">
      &times;
    </a>
    <strong>{{msg}}</strong>
  </div>
</template>

<script>
  export default {
    name: 'AlertMsg',
    data() {
      return {
        msg: "此网页表现和m西北大学软件一致，并不能提前查成绩，请悉知"
      }
    }
  }
</script>

<style scoped>

</style>
