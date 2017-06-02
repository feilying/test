// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.styl'
import store from './store/index'

Vue.use(Vuex)
Vue.use(Mint)
Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')