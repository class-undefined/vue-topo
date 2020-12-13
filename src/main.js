import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.components = {} //在vue中注册一个储存组件的容器，每个组件创建后都将自身加入这个容器
new Vue({
  render: h => h(App),
}).$mount('#app')


