import Vue from 'vue'
import App from './App'
import router from './router'
import VueMeta from 'vue-meta'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueMeta)
Vue.use(VueResource)
Vue.use(VueClipboard)

import './plugins/axios'
import store from './store'
import globalEntity from '@/utils/global.js'
Vue.prototype.GLOBAL = globalEntity

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // components: { App },   // runtimeCompiler setting 1
  // template: '<App/>'     // runtimeCompiler setting 2
  render: h => h(App) // runtimeOnly setting 1
})