export default {
  state:{
    show:false,
    msgTitle: '啊哦~',
    msg: '出错了~',
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg
    },
    showDlalog(state) {
      state.show = true
    },
    hideDlalog(state) {
      state.show = false
    }
  }
}
