import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//引入登录login组件
import Login from '@/views/Login';


Vue.use(Router)  //注册路由




export default new Router({
  routes: [
    {name:'Login',path:'/login',component:Login}
  ]
})


