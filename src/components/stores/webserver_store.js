export default {
  state: {
    host:'127.0.0.1',
  },
  mutations: {
    changeServerHost(state, hostAddr) {
      state.host = hostAddr
    }
  }
}
