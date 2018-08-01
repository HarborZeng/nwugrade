<template>
  <form name="loginForm" class="col-md-6">
    <div class="form-group card harbor-padding">
      <label for="student-number">学号：</label>
      <input id="student-number" title="学号" placeholder="10位纯数字"
             maxlength="10" v-model="studentNumber" class="form-control">
      <label for="password">密码：</label>
      <input type="password" id="password" title="密码"
             placeholder="密码和学号一样的话，留空即可" v-model="password" class="form-control">
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" name="agreement" v-model="checked"> 同意软件使用条款
        <a href="agreement.html" target="_blank">免责条款</a>
      </label>
    </div>
    <button type="button" class="btn btn-primary btn-lg" @click="login()">查询</button>
  </form>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>

</style>
