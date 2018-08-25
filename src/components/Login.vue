<template>
  <b-col md="8" class="more-space-top">

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

    <b-form-checkbox name="agreement"
                     v-model="agreementsChecked"
                     required>
      同意软件使用条款
      <a href="/static/agreement.html" target="_blank">免责条款</a>
    </b-form-checkbox>
    <b-button type="button"
              id="loginBtn"
              variant="primary btn-lg"
              @click="login">登录</b-button>
    <b-popover target="loginBtn"
            title="放心"
            show.sync="showPop"
            triggers="hover focus"
            content="你信息不会被我知道">
    </b-popover>
  </b-col>
</template>

<script>
  import bus from '../bus/bus'
  import axios from 'axios'
  import '../assets/md5.min'

  export default {
    name: 'Login',
    data() {
      return {
        studentNumber: '',
        password: '',
        agreementsChecked: false,
        showPop: false,
      }
    },
    methods: {
      // 点击事件会调用此方法
      login() {
      this.showPop = true
      setTimeout(() => {
        this.showPop = false
      }, 2000)
        // 判断学号长度
        if (this.studentNumber.length !== 9 && this.studentNumber.length !== 10) {
          if (this.studentNumber.length === 0) {
            bus.$emit("showDialog", "学号必填", "emmmmmm...")
            return
          }
          bus.$emit("showDialog", "学号长度有误", "emmmmmm...")
          return
        }
        // 如果密码未填，自动填充和学号一样的密码
        if (this.password.trim() === '') {
          this.password = this.studentNumber
        }
        // 必须同意条款才能继续
        if (!this.agreementsChecked) {
          bus.$emit("showDialog", "必须同意条款才能继续", "emmmmmm...")
          return
        }

        // 准备登录所需post的数据
        const data = JSON.stringify({
          u: this.studentNumber,
          tec: 'android:7.1.2',
          type: '110',
          p: md5(this.password + 'murp'),
          ver: '214',
          uuid: ''
        })

        bus.$emit("showLoading", "加载中...", true)
        // 发起登录的请求
        axios.post(
          this.$store.state.webserver.tellyouwhat_host + '/university-facade/Murp/Login',
          data,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          bus.$emit("loadingFinished")
          if (response.status !== 200 || response.data.state !== 200) {
            bus.$emit("showDialog", response.data.message, "服务端异常 emmmm...")
          } else {
            // 登录成功，更新数据
            this.$store.commit("changeToken", response.data.data.token)
            this.$store.commit("saveUserData", response.data.data)
            bus.$emit("loginFinished")
          }
        }).catch(error => {
          bus.$emit("showDialog", error.message, "客户端异常 emmmm...")
          bus.$emit("loadingFinished")
        })
      },
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
