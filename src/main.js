/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import Vuex from 'vuex'

import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import axios from 'axios';
import VueAxios from 'vue-axios';

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
import 'es6-promise/auto'

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

const store = new Vuex.Store({
  state: {
    count: 0,
    //api: 'http://localhost:8080/',
    api: 'http://acprobackend.ingsistemasufps.co/'
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
