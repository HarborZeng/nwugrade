<template>
  <div class="hello">
    <nav class="navbar navbar-default navbar-fixed-top ">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="index.html">西北大学第三方成绩查询</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.html">历年成绩</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container harbor-container">
      <div class="harbor-body">
        <div class="row">
          <form id="appLogin" name="loginForm" class="col-md-6">
            <div class="form-group">
              <label for="student-number">学号：</label>
              <input id="student-number" title="学号" placeholder="10位纯数字"
                     maxlength="10" v-model="studentNumber" class="form-control">
              <label for="password">密码：</label>
              <input type="password" id="password" title="密码"
                     placeholder="密码和学号一样的话，留空即可" v-model="password" class="form-control">
            </div>
            <div class="text-danger harbor-padding">
              <span v-html="errmsg"></span>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" name="agreement" v-model="checked"> 同意软件使用条款
                <a href="agreement.html" target="_blank">免责条款</a>
              </label>
            </div>
            <button type="button" class="btn btn-primary btn-lg" @click="login()">查询</button>
          </form>
          <div class="col-md-6" id="appStudyState">
            <h4>学习状态</h4>
            <hr/>
            <table class="table table-responsive table-bordered table-hover table-study">
              <tr v-for="state in studyState">
                <td><span v-html="state.k"></span></td>
                <td v-if="state.v instanceof Object">
                  <table class="table table-responsive table-bordered table-hover">
                    <tr v-for="item in state.v">
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
        <table class="table table-bordered table-hover table-width-controlled" id="appShowGrades">
          <tr>
            <th>科目</th>
            <th>成绩</th>
          </tr>
          <tr v-for="grade in grades">
            <td><span v-html="grade.kcmc"></span></td>
            <td v-if="grade.cj < 60" class="danger"><span v-html="grade.cj"></span></td>
            <td v-else-if="grade.cj >= 85" class="success"><span v-html="grade.cj"></span></td>
            <td v-else><span v-html="grade.cj"></span></td>
          </tr>
        </table>
      </div>
      <footer>
        <div class="footer copyright">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
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
                        </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'grade',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  padding: 10px 0;
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
  max-width: 400px;
  margin: 20px auto;
}

.table-study {
  font-size: small;
}
</style>
