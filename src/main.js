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


//引入插件 是可以用插件里面定义的方法
import moment from 'moment';
import myaxios from '@/plugins/MyAxios';

//导入面包屑组件 全局是因为所有页面都有面包屑导航
import MyBreadcrumb from '@/components/MyBreadcrumb';


//注册插件  表示vue实例可以用这些插件的方法
Vue.use(ElementUI);
Vue.use(myaxios);

//注册面包屑 全局组件
Vue.component(MyBreadcrumb.name,MyBreadcrumb);

//写一个全局的时间过滤器
// 必须有一个参数 使用的时候自动传参
Vue.filter('fmtDate', function (value, fmtString) {
  return moment(value).format(fmtString);
});

//



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
