<template>
  <div>
    <div class="card harbor-padding">
      <h2 class="card-title">成绩:</h2>
      <b-col md="8" class="my-1">
        <b-form-checkbox v-model="striped">条纹</b-form-checkbox>
        <b-form-checkbox v-model="bordered">边界</b-form-checkbox>
        <b-form-checkbox v-model="small" id="checkbox-small">紧凑</b-form-checkbox>
        <b-tooltip :show.sync="showSmallTip"
                   target="checkbox-small"
                   triggers="null"
                   placement="top">
          <strong>屏幕较小，已为您勾选紧凑</strong>
        </b-tooltip>
        <b-form-checkbox v-model="dark">夜间</b-form-checkbox>
        <b-form-checkbox v-model="highlight">高亮优秀和不及格</b-form-checkbox>
        <b-form-group horizontal label="过滤" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="输入任意内容"/>
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">清空</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <h5 v-html="yearAndTermNo" class="more-space-top"></h5>
      <b-table :class="small ? 'small-font' : ''"
               hover
               :items="grades"
               :fields="fields"
               :striped="striped"
               :bordered="bordered"
               :small="small"
               :dark="dark"
               :filter="filter"></b-table>
      <b-pagination align="center" size="md" :limit="limit"
                    :total-rows="totalRows" v-model="currentPage"
                    :per-page="50">
      </b-pagination>
      <div>
        <img src="/static/refresh.png"
             class="refresh-btn float-right"
             id="refreshImage"
             @click="refreshGrades"/>
      </div>
    </div>
    <div class="card harbor-padding more-space-top">
      <b-col md="8" class="my-1">
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
      </b-col>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios'
  import bus from '../bus/bus'

  export default {
    name: 'Grade',
    data() {
      return {
        currentPage: 1,

        fields: {
          courseName: {
            label: '课程',
            sortable: false
          },
          grade: {
            label: '成绩',
            sortable: true
          },
          courseBelonging: {
            label: '属性',
            sortable: false
          },
          credit: {
            label: '学分',
            sortable: true
          }
        },

        /**
         * 紧凑
         */
        small: false,

        /**
         * 条纹
         */
        striped: true,

        /**
         * 表格边框
         */
        bordered: false,

        /**
         * 夜间模式
         */
        dark: false,

        /**
         * 过滤器
         */
        filter: null,

        /**
         * 高亮优秀和不及格的成绩
         */
        highlight: false,

        /**
         * 显示自动开启紧凑的气泡
         */
        showSmallTip: false,

        /**
         * 电子邮件地址
         */
        email: '',
      }
    },
    computed: {
      /**
       * 这些年来的成绩
       */
      allTheseYearGrades: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades
        },
        set: function (newValue) {

        }
      },
      /**
       * 显示在当前table里面的成绩
       */
      grades: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades[this.currentPage - 1]
        },
        set: function (newValue) {

        }
      },
      /**
       * 总行数
       */
      totalRows: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades.length === 0 ?
            1000 :
            50 * this.$store.state.nwugrade.allTheseYearGrades.length
        },
        set: function (newValue) {

        }
      },
      /**
       * 总页数
       */
      limit: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades.length
        },
        set: function (newValue) {

        }
      },
      /**
       * 学年和学期的标语
       */
      yearAndTermNo: {
        get: function () {
          return this.grades !== undefined && this.grades.hasOwnProperty('year') && this.grades.hasOwnProperty('term') ?
            this.grades.year + '学年 ' + '第' + this.grades.term + '学期' : ''
        },
        set: function (newValue) {

        }
      }
    },
    methods: {
      /**
       * 查询成绩
       */
      queryGrades() {
        bus.$emit("showLoading", "加载中...", true)
        // 异步网络请求
        axios.get(this.$store.state.webserver.tellyouwhat_host +
          '/university-facade/MyUniversity/MyGrades?token=' +
          this.$store.state.nwugrade.token)
          .then(response => {
            bus.$emit("loadingFinished")
            if (response.status === 200 && response.data.state === 200) {
              const serverData = response.data.data
              // 把返回的成绩数据重整成更加易读的类型
              let allGrades = []
              for (let term of serverData) {
                let aTerm = []
                for (let grade of term.items) {
                  let aGrade = {}
                  aGrade.isActive = true
                  aGrade.courseName = grade.kcmc
                  aGrade.grade = grade.cj
                  aGrade.courseBelonging = grade.kcxz !== undefined ?
                    grade.kcxz.substring(0, grade.kcxz.length - 2) :
                    grade.kcxz
                  aGrade.credit = grade.xf
                  aTerm.push(aGrade)
                  aTerm.year = term.xn
                  aTerm.term = term.xq
                  if (this.highlight) {
                    if (aGrade.grade < 60) {
                      aGrade._rowVariant = 'danger'
                    } else if (aGrade.grade >= 85) {
                      aGrade._rowVariant = 'success'
                    }
                  }
                }
                allGrades.push(aTerm)
              }
              // 存储这些年来的所有成绩
              this.$store.commit("saveAllTheseYearGrades", allGrades)
              this.showGradesNotification()
            } else {
              // token失效，清空数据，重新登录
              if (response.data.state === 2003) {
                this.$store.commit("resetAllNwuData")
              }
              bus.$emit("showDialog", response.data.message, "查询你的成绩出错了")
            }
          })
          .catch(error => {
            // 查询出错
            bus.$emit("showDialog", error.toString(), "查询你的成绩出错了")
            console.warn(error)
            bus.$emit("loadingFinished")
          })
      },

      showGradesNotification() {
        if (window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission((status) => {    // 请求权限
            if (status === 'granted') {
              // 弹出一个通知
              Array.prototype.toLocaleString = () => {
                let ret = ''
                for (let i = this.allTheseYearGrades.length; i > 0; i--) {
                  for (let grade of this.allTheseYearGrades[i - 1]) {
                    ret += grade.courseName + ': ' + grade.grade + ', ' + grade.credit + '\n'
                  }
                  ret += '--------------------------------------\n'
                }
                return ret
              }
              new Notification('成绩查出来喽', {
                body: this.allTheseYearGrades.toLocaleString(),
                icon: '/static/logo.png'
              })
            }
          });
        }
      },

      /**
       * 操作使成绩高亮那些优秀的和不及格的
       */
      performHighLight() {
        if (this.highlight) {
          this.$store.commit("doHighlightStore")
        } else {
          this.$store.commit('undoHighlightStore')
        }
      },

      /**
       * 订阅成绩变化的邮件通知
       */
      subscribeGradesChanges() {
        bus.$emit("showDialog", "这项功能正在实验中，敬请期待", "Sorry")
      },

      /**
       * 点击刷新的图片，出发这个事件，刷新成绩
       */
      refreshGrades() {
        // 没有登录就不要继续了
        if (this.$store.state.nwugrade.token === '') {
          return
        }

        // 每2ms角度加4°的动画
        let deg = 0;
        let interval = setInterval(() => {
          deg += 4;
          document.getElementById('refreshImage').style.transform = "rotate(" + deg + "deg)";
        }, 2);

        // 注册监听查成绩加载完毕之后的事件
        bus.$on('loadingFinished', () => {
          // 查询成绩完了后停下动画
          clearInterval(interval)
          // 刷新按钮回归原位
          document.getElementById('refreshImage').style.transform = "rotate(0deg)";
        })
        // 开始查成绩
        this.queryGrades()
      }
    },
    created() {
      //当监听到loginFinished事件时查询一下成绩
      bus.$on("loginFinished", () => {
        this.queryGrades()
      })

      bus.$on("refreshRequested", () => {
        if (this.$store.state.nwugrade.token !== '') {
          //登录过，有token，但是没有查过成绩
          this.queryGrades()
        }
      })

      if (this.$store.state.nwugrade.token !== '') {
        //登录过，有token，但是没有查过成绩
        this.queryGrades()
      }

      // 在加载页面的时候就重新绘制一下高亮
      this.performHighLight()

      //加载页面的时候，根据屏幕大小选择提示气泡出现与否
      if (document.documentElement.clientWidth < 470) {
        this.small = true
        // 延迟550ms再显示气泡，以防页面还有其他动画，导致气泡位置不对
        if (this.$store.state.nwugrade.token === '') {
          setTimeout(() => {
            this.showSmallTip = true
          }, 550)
        }
        //气泡3000ms后自动消失
        setTimeout(() => {
          this.showSmallTip = false
        }, 3000)
      }

    },
    watch: {
      /**
       * 监听当highlight变了之后，立即执行performHighLight()
       */
      highlight: function () {
        this.performHighLight()
      }
    }
  }

</script>

<style scoped>
  /*作用域有限，限定在本组件的css*/
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

  .small-font {
    font-size: small;
  }

  .refresh-btn {
    width: 50px;
    height: 50px;
  }
</style>
