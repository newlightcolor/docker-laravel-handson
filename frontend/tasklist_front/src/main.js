import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import vuetify from './plugins/vuetify'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

library.add(fas)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.component('fa-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
