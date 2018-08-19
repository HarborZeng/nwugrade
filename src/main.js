// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

//vuex
import store from './store'

// 使用bootstrapVue
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
