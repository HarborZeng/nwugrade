<template>
  <div class="card harbor-padding more-space-top">
    <b-col md="8" class="my-1">
      <div v-if="!hasSubscribed">
        <b-form-group label="当我的成绩生发变动时，发邮件通知"
                      label-for="emailInput"
                      description="订阅成绩变更通知">
          <b-form-input id="emailInput"
                        type="email"
                        v-model="email"
                        placeholder="电子邮件地址"
                        required>
          </b-form-input>
        </b-form-group>
        <b-button variant="outline-success" type="button"
                  @click="subscribeGradesChanges"
                  class="float-right">订阅
        </b-button>
      </div>
      <div class="margin-a-little" v-else-if="hasAuthentication && hasSubscribed">
        <p v-if="hasSubscribed">您已订阅自动查询成绩的邮件，<span v-if="isNotifyOnlyGradesChanged">当成绩有变动时，</span>您的邮箱<b> {{emailAddress}} </b>会收到包含您最新成绩的邮件哦。</p>
        <p>您的自动查询策略是 <b>{{triggerStrategy}}</b>
          <b-badge variant="info" href="https://www.jianshu.com/p/f03b1497122a" target="_blank">什么是CRON表达式</b-badge>
        </p>
        <p>下次自动查询的时间是<b>{{nextFireTime}}</b></p>
        <b-button variant="outline-primary" type="button"
                  @click="cancelSubscribe"
                  class="float-right">取消自动查询
        </b-button>
      </div>
    </b-col>
  </div>
</template>

<script>
  import bus from '../bus/bus'
  import axios from 'axios'

  export default {
    name: "Subscribe",
    data() {
      return {
        /**
         * 电子邮件地址
         */
        email: '',
        hasSubscribed: false,
        isNotifyOnlyGradesChanged: false,
        emailAddress: '暂无',
        nextFireTime: '暂无',
        triggerStrategy: '暂无'
      }
    },
    computed: {
      hasAuthentication: {
        get: function () {
          return this.$store.state.nwugrade.token !== ''
        },
        set: function () {

        }
      }
    },
    methods: {
      /**
       * 订阅成绩变化的邮件通知
       */
      subscribeGradesChanges() {
        axios.post(this.$store.state.webserver.tellyouwhat_api_host +
          '/task', {
          studentNumber: this.$store.state.nwugrade.usrData.xh,
          token: this.$store.state.nwugrade.usrData.token,
          email: this.email,
          queryStrategy: {
            timeUnit: "minute",
            n: 1,
            queryTime: -1
          },
          notifyStrategy: {
            notifyOnlyGradesChanged: false
          }
        })
          .then(response => {
            console.log(response)
            bus.$emit("showDialog", "订阅成功，您将会收到邮件通知", "恭喜你")
            this.querySubscribeStatus()
            this.hasSubscribed = true
          })
          .catch(e => {
            if (e.response.status === 400) {
              console.warn(e.response.data)
              let message = '';
              for (let error of e.response.data.errors) {
                message += error.defaultMessage + " "
              }
              bus.$emit("showDialog", message, "订阅失败")
            } else if (e.response.status === 500) {
              console.warn(e.response.data)
              bus.$emit("showDialog", e.response.data.message, "订阅失败")
            }
          })
        // bus.$emit("showDialog", "这项功能正在实验中，敬请期待", "Sorry")
      },
      cancelSubscribe() {
        axios.delete(this.$store.state.webserver.tellyouwhat_api_host +
          '/task/' + this.$store.state.nwugrade.usrData.xh)
          .then(response => {
            this.hasSubscribed = false
            bus.$emit("showDialogWithCloseMsg", "您已取消成功", "操作成功", "OK")
          })
          .catch(e => {
            bus.$emit("showDialogWithCloseMsg", "取消失败", "sorry", "OK")
          })
      },
      querySubscribeStatus() {
        axios.get(this.$store.state.webserver.tellyouwhat_api_host +
          '/task/' + this.$store.state.nwugrade.usrData.xh)
          .then(response => {
            console.log(response)
            this.hasSubscribed = true;
            this.isNotifyOnlyGradesChanged = response.data.notifyOnlyGradesChanged
            this.emailAddress = response.data.student.email
            this.nextFireTime = response.data.nextFireTime
            this.triggerStrategy = response.data.cronExpression
          })
          .catch(e => {
            if (e.response.status === 500) {
              console.warn("code: " + e.response.data.code + ", message: " + e.response.data.message)
              this.hasSubscribed = false;
            }
          })
      }
    },
    created() {
      this.querySubscribeStatus()
    }
  }
</script>

<style scoped>
  .margin-a-little {
    margin: 10px;
  }
</style>
