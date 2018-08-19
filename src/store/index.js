import Vue from 'vue'
import vuex from 'vuex'

// 使用vuex
Vue.use(vuex);

// 模块化vuex，解耦
import dialog_store from '../components/stores/dialog_store.js';
import nwugrade_store from '../components/stores/nwugrade_store.js';
import webserver_store from '../components/stores/webserver_store.js';

// 向外暴露三个vuex子模块
export default new vuex.Store({
  modules: {
    dialog: dialog_store,
    nwugrade: nwugrade_store,
    webserver: webserver_store,
  }
})
