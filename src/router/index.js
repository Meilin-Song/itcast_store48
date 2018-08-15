import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//引入登录login组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';

Vue.use(Router)  //注册路由 




export default new Router({
  routes: [
    //登录之后当前主页直接显示users
    //与侧导航栏的默认选中user选项配合使用
    {path:'/',redirect:'/users'},
    {name:'Login',path:'/login',component:Login},
    {name:'Home',
      path:'/',
      component:Home,
      // 给home设置子路由 所有的子页面都在这设置 路由嵌套
      children:[
        {name:'Users',path:'/users',component:Users},
        {name:'Rights',path:'/rights',component:Rights},
        {name:'Roles',path:'/roles',component:Roles}
      ]
    }
  ]
})


