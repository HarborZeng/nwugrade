<template>
  <b-form class="col-md-6">

    <b-form-group
      label="学号："
      label-for="student-number"
      description="10位或11位纯数字">
      <b-form-input
        id="student-number"
        title="学号"
        required
        maxlength="11"
        minlength="10"
        v-model="studentNumber">
      </b-form-input>
    </b-form-group>

    <b-form-group
      label="密码："
      label-for="password"
      description="密码和学号一样的话，留空即可">
      <b-form-input
        type="password"
        id="password"
        title="密码"
        required
        v-model="password">
      </b-form-input>
    </b-form-group>

    <b-form-checkbox v-model="checked"
                     name="agreement"
                     value=true
                     unchecked-value=false
                     required>
      同意软件使用条款
      <a href="agreement.html" target="_blank">免责条款</a>
    </b-form-checkbox>
    <b-button type="button" variant="primary btn-lg" @click="login()">查询</b-button>
  </b-form>
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
        if (this.studentNumber.length !== 9 && this.studentNumber.length !== 10) {
          if (this.studentNumber.length === 0) {
            bus.$emit("showDialog", "学号必填", "emmm...")
            return
          }
          bus.$emit("showDialog", "学号长度有误", "emmm...")
          return
        }
        // 如果密码未填，自动填充和学号一样的密码
        if (this.password.trim() === '') {
          this.password = this.studentNumber
        }
        // 必须同意条款才能继续
        if (!this.checked) {
          bus.$emit("showDialog", "必须同意条款才能继续", "emmm...")
        }
      }
    },
    watch: {
      // 如果 `studentNumber` 发生改变，这个函数就会运行
      studentNumber: function () {
        this.password = this.studentNumber
      }
    }
  }
</script>

<style scoped>

</style>
