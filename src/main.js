import Vue from 'vue'
import App from './App.vue'
import './permission'
import router from './router'
import ElementUI from 'element-ui'
import axios from './utils/request.js'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import component from './components'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
