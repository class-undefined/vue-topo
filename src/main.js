import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import '@/icons'
Vue.config.productionTip = false
window.globalEvent = new Vue();//注册全局事件对象
new Vue({
  render: h => h(App),
}).$mount('#app')
