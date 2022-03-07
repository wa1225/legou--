import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局清除默认样式
import './assets/css/reset.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$imgUrl='http://localhost:3000'
// 引入全局组件
import gCom from './common'

for(let i in gCom){
  Vue.component(i,gCom[i])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
