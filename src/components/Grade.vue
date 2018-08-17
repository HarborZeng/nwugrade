<template>
  <div>
    <div class="card harbor-padding">
      <h2 class="card-title">成绩:</h2>
      <b-col md="8" class="my-1">
        <b-form-checkbox v-model="striped">条纹颜色</b-form-checkbox>
        <b-form-checkbox v-model="bordered">显示边界</b-form-checkbox>
        <b-form-checkbox v-model="small">紧凑</b-form-checkbox>
        <b-form-checkbox v-model="dark">夜间模式</b-form-checkbox>
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
      <b-table class="more-space-top small-font"
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
                    :per-page="50" @input="changePage()">
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
        // 初始化app里面的几个变量的值
        allTheseYearGrades: this.$store.state.nwugrade.allTheseYearGrades.length === 0 ? [
          [{courseName: "空"}]
        ] : this.$store.state.nwugrade.allTheseYearGrades,

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

        grades: [
          {courseName: "空"}
        ],

        totalRows: this.$store.state.nwugrade.allTheseYearGrades.length === 0 ?
          1000 :
          50 * this.$store.state.nwugrade.allTheseYearGrades.length,
        limit: this.$store.state.nwugrade.allTheseYearGrades.length,
        striped: true,
        bordered: false,
        small: false,
        dark: false,
        filter: null,
        yearAndTermNo: '',
      }
    },
    methods: {
      queryGrades() {
        bus.$emit("showLoading", "加载中...", true)
        axios.get(this.$store.state.webserver.nwu_host + '/university-facade/MyUniversity/MyGrades?token=' + this.$store.state.nwugrade.token)
          .then(response => {
            bus.$emit("loadingFinished")
            if (response.status === 200 && response.data.state === 200) {
              const serverData = response.data.data
              //清空之前留下的数据
              this.allTheseYearGrades = []
              for (let term in serverData) {
                let aTerm = []
                for (let grade in serverData[term].items) {
                  let aGrade = {}
                  aGrade.isActive = true
                  aGrade.courseName = serverData[term].items[grade].kcmc
                  aGrade.grade = serverData[term].items[grade].cj
                  aGrade.courseBelonging = serverData[term].items[grade].kcxz !== undefined ?
                    serverData[term].items[grade].kcxz.substring(0, serverData[term].items[grade].kcxz.length - 2) :
                    serverData[term].items[grade].kcxz
                  aGrade.credit = serverData[term].items[grade].xf
                  if (aGrade.grade < 60) {
                    aGrade._rowVariant = 'danger'
                  } else if (aGrade.grade >= 85) {
                    aGrade._rowVariant = 'success'
                  }
                  aTerm.push(aGrade)
                  aTerm.year = serverData[term].xn
                  aTerm.term = serverData[term].xq
                }
                this.allTheseYearGrades.push(aTerm)
              }
              this.$store.commit("saveAllTheseYearGrades", this.allTheseYearGrades)
              this.showGradesInTable();
            } else {
              bus.$emit("showDialog", response.data.message, "查询你的成绩出错了")
            }
          }).catch(error => {
          bus.$emit("showDialog", error.toString(), "查询你的成绩出错了")
          console.warn(error)
          bus.$emit("loadingFinished")
        })
      },
      //翻页
      changePage() {
        this.grades = this.allTheseYearGrades[this.currentPage - 1]
        if (this.allTheseYearGrades[this.currentPage - 1].hasOwnProperty('year') && this.allTheseYearGrades[this.currentPage - 1].hasOwnProperty('term'))
          this.yearAndTermNo = this.allTheseYearGrades[this.currentPage - 1].year + '学年 第' + this.allTheseYearGrades[this.currentPage - 1].term + '学期'
      },
      //展示成绩
      showGradesInTable() {
        this.grades = this.allTheseYearGrades[0]
        this.totalRows = 50 * this.allTheseYearGrades.length
        this.limit = this.allTheseYearGrades.length
        this.yearAndTermNo = this.allTheseYearGrades[this.currentPage - 1].year + '学年 第' + this.allTheseYearGrades[this.currentPage - 1].term + '学期'
      },
    },
    created() {
      //当监听到loginFinished事件时查询一下成绩
      bus.$on("loginFinished", () => {
        this.queryGrades()
      })

      bus.$on("loginExit", () => {
        this.allTheseYearGrades = [
          [{courseName: "空"}]
        ]
        this.totalRows = 50 * this.allTheseYearGrades.length
        this.limit = this.allTheseYearGrades.length
        this.grades = [
          {courseName: "空"}
        ]
        this.yearAndTermNo = ''
      })

      if (this.$store.state.nwugrade.token !== '' && this.$store.state.nwugrade.allTheseYearGrades.length === 0) {
        //登录过，有token，但是没有查过成绩
        this.queryGrades()
      }
    },
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
