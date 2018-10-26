// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import store from './store'
import http from './utils/request'
import router from './router'
import mixin from './mixin'
import i18n from './lang' // Internationalization

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './permission' // permission control

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.$http = http // 网络请求封装
Vue.mixin(mixin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
