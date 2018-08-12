import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//引入登录login组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';


Vue.use(Router)  //注册路由 




export default new Router({
  routes: [
    {name:'Login',path:'/login',component:Login},
    {name:'Home',
      path:'/',
      component:Home,
      // 给home设置子路由 所有的子页面都在这设置 路由嵌套
      children:[
        {name:'Users',path:'/users',component:Users}
      ]
    }
  ]
})


