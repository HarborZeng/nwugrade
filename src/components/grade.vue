<template>
  <div>
    <!-- Modal -->
    <div class="modal" id="errMsgModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">啊哦~</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span v-html="errmsg"></span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">我知道了</button>
            <!--<button type="button" class="btn btn-primary">Save changes</button>-->
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand">西大成绩查询 - m西北大学网页版（非官方）</a>
        </div>
      </div>
    </nav>

    <div class="container harbor-container" id="app">
      <div class="harbor-body">
        <div class="alert alert-warning">
          <a href="#" class="close" data-dismiss="alert">
            &times;
          </a>
          <strong>此网页表现和m西北大学软件一致，并不能提前查成绩，请悉知</strong>
        </div>
        <div class="row">
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
          <div class="col-md-6 card harbor-padding">
            <h4>学习状态</h4>
            <hr/>
            <table class="table table-bordered table-hover table-study">
              <tr :key="state.k" v-for="state in studyState">
                <td><span v-html="state.k"></span></td>
                <td v-if="state.v instanceof Object">
                  <table class="table table-responsive table-bordered table-hover">
                    <tr v-if="state.v.length === 0">
                      <td><span>无</span></td>
                    </tr>
                    <tr v-else :key="item.k" v-for="item in state.v">
                      <td><span v-html="item.k"></span></td>
                      <td><span v-html="item.v"></span></td>
                    </tr>
                  </table>
                </td>
                <td v-else-if="state.v === ''"><span>尚未填写</span></td>
                <td v-else><span v-html="state.v"></span></td>
              </tr>
            </table>
          </div>
        </div>
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
            <tr :key="grade.kcmc" v-for="grade in grades">
              <td><span v-html="grade.kcmc"></span></td>
              <td v-if="grade.cj < 60" class="badge badge-pill badge-danger"><span v-html="grade.cj"></span></td>
              <td v-else-if="grade.cj >= 60 && grade.cj < 70" class="badge badge-pill badge-warning"><span v-html="grade.cj"></span></td>
              <td v-else-if="grade.cj >= 85" class="badge badge-pill badge-success"><span v-html="grade.cj"></span></td>
              <td v-else><span v-html="grade.cj"></span></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="footer copyright container row">
        <div class="">
          <span>
              Copyright &copy; HarborZeng
              <a href="https://tellyouwhat.cn/">tellyouwhat.cn</a>
          </span> <br/>
          <span>
              项目源代码：
              <a href="https://github.com/HarborZeng/NwuGradeTeller_Vue"
                 target="_blank">
              https://github.com/HarborZeng/NwuGradeTeller_Vue
              </a>
          </span> <br/>
          <span>
              此软件仅能以学习交流为目的运行，如果给学校的利益带来任何形式的损失，原作者不负任何责任<br/>
              此软件为纯前端代码，不会以任何技术可能的手段记录您的个人信息！！！
          </span> <br/>
          <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../assets/busuanzi.pure.mini'
import '../assets/md5.min'
import '../assets/jquery_3.2.1_jquery.slim.min'
import '../assets/bootstrap.min'
import '../assets/popper.js_1.12.9_umd_popper.min'
import axios from 'axios'
export default {
  name: 'grade',
  data () {
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
    login () {
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
