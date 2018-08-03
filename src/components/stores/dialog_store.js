export default {
  state:{
    msgTitle: '啊哦~',
    msg: '出错了~',
    closeMsg: '我知道了'
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg
    },
    changeMsgTitle(state, title) {
      state.msg = title
    },
  }
}
