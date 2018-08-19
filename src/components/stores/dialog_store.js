// 弹窗内容vuex子模块，存储弹窗文案，当文案改变时，写在computed里的弹窗内容也会响应式变化，反映在视图中
export default {
  // 初始化
  state:{
    /**
     * 弹窗标题
     */
    msgTitle: '啊哦~',
    /**
     * 弹窗内容
     */
    msg: '出错了~',
    /**
     * 关闭按钮文案
     */
    closeMsg: '我知道了'
  },
  // set操作
  mutations: {
    /**
     * 修改弹窗内容
     * @param state 自身
     * @param msg 弹窗内容
     */
    changeMsg(state, msg) {
      state.msg = msg
    },
    /**
     * 修改弹窗标题
     * @param state 自身
     * @param title 弹窗标题
     */
    changeMsgTitle(state, title) {
      state.msgTitle = title
    },
    /**
     * 修改关闭按钮文案
     * @param state 自身
     * @param closeMsg 关闭按钮文案
     */
    changeCloseMsg(state, closeMsg) {
      state.closeMsg = closeMsg
    },
  }
}
