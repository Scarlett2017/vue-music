import 'babel-polyfill'//es6语法转义
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'//解决移动端点击300ms延时问题
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

fastclick.attach(document.body)  //移动端按钮没有300ms延时

// 注册懒加载，使图片滑动到哪儿就加载到哪儿，节省流量
Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})

import './common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
