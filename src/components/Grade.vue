<template>
  <div>
    <div class="card harbor-padding">
      <h2 class="card-title">成绩</h2>
      <table class="table table-bordered table-hover table-width-controlled">
        <tr>
          <th>科目</th>
          <th>成绩</th>
        </tr>
        <tr>
          <td v-if="grades.length === 0" colspan="2"><span>无</span></td>
        </tr>
        <tr :key="Grade.kcmc" v-for="grade in grades">
          <td><span v-html="Grade.kcmc"></span></td>
          <td v-if="Grade.cj < 60" class="badge badge-pill badge-danger"><span v-html="Grade.cj"></span></td>
          <td v-else-if="Grade.cj >= 60 && Grade.cj < 70" class="badge badge-pill badge-warning"><span
            v-html="Grade.cj"></span></td>
          <td v-else-if="Grade.cj >= 85" class="badge badge-pill badge-success"><span v-html="Grade.cj"></span></td>
          <td v-else><span v-html="Grade.cj"></span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import '../assets/busuanzi.pure.mini'
  import '../assets/md5.min'
  import '../assets/jquery_3.2.1_jquery.slim.min'
  import '../assets/bootstrap.min'
  import '../assets/popper.js_1.12.9_umd_popper.min'
  import axios from 'axios'

  export default {
    name: 'Grade',
    data() {
      return {
        // 初始化app里面的几个变量的值
        studentNumber: '',
        password: '',
        errmsg: '',
        checked: false,
        grades: [],
        studyState: {}
      }
    },
    methods: {
      // 点击事件会调用此方法
      login() {
        // 将红色的信息显示成正在查询
        this.errmsg = '正在查询。。。'

        // 判断学号长度
        if (this.studentNumber.length !== 10) {
          this.errmsg = '学号长度有误'
          $('#errMsgModal').modal('show')
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

        // 准备登录所需post的数据
        const data = JSON.stringify({
          u: this.studentNumber,
          tec: 'android:7.1.2',
          type: '110',
          p: md5(this.password + 'murp'),
          ver: '214',
          uuid: ''
        })

        // 发起登录的请求
        axios.post(
          'http://gradeapi.tellyouwhat.cn/university-facade/Murp/Login',
          data,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            if (response.status !== 200 || response.data.state !== 200) {
              this.errmsg = response.data.message
              $('#errMsgModal').modal('show')
              return
            }
            // 调用那两个函数
            // http://ydjw.nwu.edu.cn/university-facade/MyUniversity/StudyState?token=
            fetch('http://ydjw.nwu.edu.cn/university-facade/MyUniversity/StudyState?token=' + response.data.data.token)
              .then(response => response.json())
              .then(json => {
                // 与服务器通信成功
                if (json.state === 200) {
                  // 服务器返回数据没有异常
                  // 把查出来的学习状态json对象赋给学习状态studyState
                  this.studyState = json.data
                } else {
                  this.errmsg = json.message
                  $('#errMsgModal').modal('show')
                }
              })
            axios.get('http://ydjw.nwu.edu.cn/university-facade/MyUniversity/MyGrades?token=' + response.data.data.token)
              .then(response => {
                // 与服务器通信没有错误
                if (response.data.state === 200) {
                  // 数据返回没有异常
                  // 清空现有成绩
                  this.grades = []
                  // 循环把所有成绩装进数组
                  for (let item in response.data.data) {
                    for (let i in response.data.data[item].items) {
                      this.grades.push(response.data.data[item].items[i])
                    }
                  }
                } else {
                  this.errmsg = response.data.message
                  $('#errMsgModal').modal('show')
                }
              })
              .catch(error => {
                console.log(error)
                this.errmsg = error.toString()
                $('#errMsgModal').modal('show')
              })
          })
          .catch(error => {
            this.errmsg = '出错: ' + error.toString()
            $('#errMsgModal').modal('show')
          })
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
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .harbor-container {
    margin-top: 60px;
  }

  .harbor-body {
    max-width: 100%;
    padding: 15px;
    margin: 0 auto 20px auto;
  }

  .copyright {
    margin-top: 45px;
    background: #ffffff;
    font-size: 13px;
    text-align: center;
    color: #555555;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: dashed seashell 3px;
    position: relative;
    width: 100%;
    bottom: 0;
  }

  .copyright span {
    margin: 0 .5em;
  }

  .copyright a {
    color: #555555;
  }

  h1 a {
    color: #3c3c3c;
  }

  h1 a:hover {
    color: #0a0005;
    background-color: transparent;
    text-decoration: none;
  }

  .harbor-padding {
    padding: 10px;
  }

  .agree-pre {
    padding: 10px;
    font-size: 12px;
    /*    text-indent: 2em;*/
    white-space: pre-wrap;
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/
    white-space: -o-pre-wrap; /*Opera7*/
    word-wrap: break-word; /*InternetExplorer5.5+*/
  }

  .table-width-controlled {
    max-width: 500px;
    margin: 20px auto;
  }

  .table-study {
    font-size: small;
  }
</style>
