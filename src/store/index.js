import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import dialog_store from '../components/stores/dialog_store.js';
import nwugrade_store from '../components/stores/nwugrade_store.js';
import webserver_store from '../components/stores/webserver_store.js';

export default new vuex.Store({
  modules: {
    dialog: dialog_store,
    nwugrade: nwugrade_store,
    webserver: webserver_store,
  }
})
