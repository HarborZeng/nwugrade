// 主业务-查成绩内容vuex子模块，存储用户信息，成绩信息，学习状态，token，当文案改变时，写在computed里的内容也会响应式变化，反映在视图中
// 所有没有存储到localStorage中的字段都会在刷新页面后丢失
export default {
  //初始化
  state: {
    /**
     * 学生token，所有接口的调用都离不开他，
     * 存在<code>localStorage</code>里面
     * 初始化的时候取出
     */
    token: localStorage.getItem("token") === null ? '' : localStorage.getItem("token"),

    /**
     * 用户信息usrData，包括学号，姓名等个人信息
     * 存在<code>localStorage</code>里面
     * 初始化的时候取出
     */
    usrData: localStorage.getItem("usrData") === null ?
      {name: '未登录', xh: '未登录'} :
      JSON.parse(localStorage.getItem("usrData")),

    /**
     * 所有成绩，这些年来的成绩，按学期存储
     * 默认为一个课程名为“空”的对象数组的数组
     */
    allTheseYearGrades: [[{courseName: '空'}]],

    /**
     * 学习状态初始化
     */
    studyState: {"k": "msg", "v": "登录即查询"},
  },

  // set操作
  mutations: {
    /**
     * 修改token
     * @param state 自身
     * @param token 新的token
     */
    changeToken(state, token) {
      // 存token到localStorage中
      localStorage.setItem("token", token)
      state.token = token
    },

    /**
     * 存储userData到localStorage中
     * @param state 自身
     * @param usrData 用户信息对象
     */
    saveUserData(state, usrData) {
      //存储userData到localStorage中，字符串化，解决一些问题
      localStorage.setItem("usrData", JSON.stringify(usrData))
      state.usrData = usrData
    },

    /**
     * 存储这些年来的成绩
     * @param state 自身
     * @param allTheseYearGrades 这些年来的成绩数组
     */
    saveAllTheseYearGrades(state, allTheseYearGrades) {
      state.allTheseYearGrades = allTheseYearGrades
    },

    /**
     * 存储学习状态对象
     * @param state 自身
     * @param studyState 学习状态对象
     */
    saveStudyState(state, studyState) {
      state.studyState = studyState
    },

    /**
     * 给每一个大于85和不及格的课程高亮
     * @param state
     */
    doHighlightStore(state) {
      state.allTheseYearGrades.forEach(term => {
        term.forEach(grade => {
          // 通过设置_rowVariant属性，让bootstrap-vue的table去处理
          if (grade.grade < 60) {
            grade._rowVariant = 'danger'
          } else if (grade.grade >= 85) {
            grade._rowVariant = 'success'
          }
        })
      })
    },

    /**
     * 给每一个大于85和不及格的课程取消高亮
     * @param state
     */
    undoHighlightStore(state) {
      state.allTheseYearGrades.forEach(term => {
        term.forEach(grade => {
          // 通过删除_rowVariant属性，让bootstrap-vue的table就不会渲染他的颜色了
          delete grade._rowVariant
        })
      })
    },

    /**
     * 重置所有变量，代表注销或退出登录被点击
     * @param state
     */
    resetAllNwuData(state) {
      // 清空localStorage
      localStorage.clear()
      state.token = ''
      state.usrData = {name: '未登录', xh: '未登录'}
      state.allTheseYearGrades = [[{courseName: '空'}]]
      state.studyState = {"k": "msg", "v": "登录即查询"}
    }
  }
}
