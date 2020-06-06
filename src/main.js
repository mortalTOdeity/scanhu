// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, RadioGroup, Radio, Icon, Tabbar, TabbarItem, Notify } from 'vant'
import 'vant/lib/icon/local.css'
import VConsole from 'vconsole'

const vConsole = new VConsole()
Vue.use(vConsole)
Vue.use(Button)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Notify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
