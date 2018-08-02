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
  import bus from '../bus/bus'

  export default {
    name: 'Login',
    data() {
      return {
        studentNumber: '',
        password: '',
        checked: false
      }
    },
    methods: {
// 点击事件会调用此方法
      login() {
        // 判断学号长度
        if (this.studentNumber.length !== 10) {
          this.$store.commit('changeMsg', '学号长度有误')
          bus.$emit("showDialog")
          return
        }
        // 如果密码未填，自动填充和学号一样的密码
        if (this.password.trim() === '') {
          this.password = this.studentNumber
        }
        // 必须同意条款才能继续
        if (!this.checked) {
          this.errmsg = '必须同意条款才能继续'
          $('#errMsgModal').modal('show')
          return
        }
      }
    }
  }
</script>

<style scoped>

</style>
