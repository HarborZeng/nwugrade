export default {
  state: {
    token: '',
    usrData: {},
    allTheseYearGrades: [],
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
    resetAllNwuData(state) {
      state.token = ''
      state.usrData = {}
      state.allTheseYearGrades = []
    }
  }
}
