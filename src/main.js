import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入flexible插件
import 'lib-flexible/flexible'
//引入vue-router
import VueRouter from 'vue-router'
//使用vue-router插件

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')