export default {
  state: {
    token: '',
    usrData: {},
    allTheseYearGrades: [[{courseName: '空'}]],
    studyState: {},
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    saveUserData(state, usrData) {
      state.usrData = usrData
    },
    saveAllTheseYearGrades(state, allTheseYearGrades) {
      state.allTheseYearGrades = allTheseYearGrades
    },
    saveStudyState(state, studyState) {
      state.studyState = studyState
    },
    doHighlightStore(state) {
      state.allTheseYearGrades.forEach(term => {
        term.forEach(grade => {
          if (grade.grade < 60) {
            grade._rowVariant = 'danger'
          } else if (grade.grade >= 85) {
            grade._rowVariant = 'success'
          }
        })
      })
    },
    undoHighlightStore(state) {
      state.allTheseYearGrades.forEach(term => {
        term.forEach(grade => {
          delete grade._rowVariant
        })
      })
    },
    resetAllNwuData(state) {
      state.token = ''
      state.usrData = {}
      state.allTheseYearGrades = [[{courseName: '空'}]]
      state.studyState = {}
    }
  }
}
