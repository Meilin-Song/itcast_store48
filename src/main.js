// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'


//导入自定义css
import '@/assets/css/index.css';
//引入时间格式化
import moment from 'moment';


//写一个全局的时间过滤器
// 必须有一个参数 使用的时候自动传参
Vue.filter('fmtDate', function (value, fmtString) {
  return moment(value).format(fmtString);
});



Vue.use(ElementUI)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
