// 域名管理vuex子模块，存储域名
export default {
  state: {
    /**
     * 西北大学ydjw的接口域名
     */
    nwu_host:'http://ydjw.nwu.edu.cn',

    /**
     * 西北大学ydjw的接口域名中的登录做了CSRF保护处理，
     * 通过搭建透明代理，绕过安全保护
     * 次域名仅作登录使用
     */
    tellyouwhat_host:'http://gradeapi.tellyouwhat.cn',
  },
  mutations: {

  }
}
