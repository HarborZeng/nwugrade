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
      <h5 v-html="yearAndTermNo"></h5>
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

        small: false,
        striped: true,
        bordered: false,
        dark: false,
        filter: null,
        highlight: false,
        showSmallTip: false
      }
    },
    computed: {
      allTheseYearGrades: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades
        },
        set: function (newValue) {

        }
      },
      grades: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades[this.currentPage - 1]
        },
        set: function (newValue) {

        }
      },
      totalRows: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades.length === 0 ?
            1000 :
            50 * this.$store.state.nwugrade.allTheseYearGrades.length
        },
        set: function (newValue) {

        }
      },
      limit: {
        get: function () {
          return this.$store.state.nwugrade.allTheseYearGrades.length
        },
        set: function (newValue) {

        }
      },
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
      queryGrades() {
        bus.$emit("showLoading", "加载中...", true)
        axios.get(this.$store.state.webserver.nwu_host +
          '/university-facade/MyUniversity/MyGrades?token=' +
          this.$store.state.nwugrade.token)
          .then(response => {
            bus.$emit("loadingFinished")
            if (response.status === 200 && response.data.state === 200) {
              const serverData = response.data.data
              //清空之前留下的数据
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
              this.$store.commit("saveAllTheseYearGrades", allGrades)
            } else {
              bus.$emit("showDialog", response.data.message, "查询你的成绩出错了")
            }
          })
          .catch(error => {
            bus.$emit("showDialog", error.toString(), "查询你的成绩出错了")
            console.warn(error)
            bus.$emit("loadingFinished")
          })
      },

      performHighLight() {
        if (this.highlight) {
          this.$store.commit("doHighlightStore")
        } else {
          this.$store.commit('undoHighlightStore')
        }
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

      this.performHighLight()

      //加载页面的时候，提示屏幕大小
      if (document.documentElement.clientWidth < 470) {
        this.small = true
        if (this.$store.state.nwugrade.token === '') {
          setTimeout(() => {
            this.showSmallTip = true
          }, 550)
        }
        setTimeout(() => {
          this.showSmallTip = false
        }, 3000)
      }

    },
    watch: {
      highlight: function () {
        this.performHighLight()
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
</style>
