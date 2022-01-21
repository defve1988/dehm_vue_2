import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import User from "@/app_class/user";
import EBAS from "@/app_class/ebas";
import DEHM from "@/app_class/dehm";

Vue.config.productionTip = false


import axios from 'axios'
// NOTE: as a proxy is used, the baseURL is still 'http://localhost:8080'
// var env = 'loacl';
export const base = axios.create({
  baseURL: 'http://10.28.6.42:5000/'
  // baseURL: env === 'loacl' ? 'http://127.0.0.1:5000' : 'https://defve-app-backend.herokuapp.com'
});
Vue.prototype.$http = base;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

import my_component from './components/index'
Vue.use(my_component)

store.state.app_data.user = new User(base)
store.state.app_data.ebas = new EBAS(base)
store.state.app_data.dehm = new DEHM(base)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
