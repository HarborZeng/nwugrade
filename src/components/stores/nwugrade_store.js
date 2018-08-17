export default {
  state: {
    token: '',
    usrData: {},
    allTheseYearGrades: [],
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
    resetAllNwuData(state) {
      state.token = ''
      state.usrData = {}
      state.allTheseYearGrades = []
      state.studyState = {}
    }
  }
}
