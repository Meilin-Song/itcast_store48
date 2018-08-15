import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//引入登录login组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';
import { Message } from 'element-ui';

Vue.use(Router)  //注册路由 




// export default new Router({
//   routes: [
//     //登录之后当前主页直接显示users
//     //与侧导航栏的默认选中user选项配合使用
//     {path:'/',redirect:'/users'},
//     {name:'Login',path:'/login',component:Login},
//     {name:'Home',
//       path:'/',
//       component:Home,
//       // 给home设置子路由 所有的子页面都在这设置 路由嵌套
//       children:[
//         {name:'Users',path:'/users',component:Users},
//         {name:'Rights',path:'/rights',component:Rights},
//         {name:'Roles',path:'/roles',component:Roles}
//       ]
//     }
//   ]
// })


const router = new Router({
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

router.beforeEach((to,from,next)=>{
  //去哪      （跳转去哪个路由规则） 是路由规则对象
  //从哪儿来  （从哪个路由规则跳转）
  // next();      // 必须有next   执行跳转  否则页面不显示

 //在路由跳转之前  判断token
  // to的name存在  并且不是login
  if(to.name && to.name.toLocaleLowerCase() !== 'login'){
    //验证token 再next
    const token = sessionStorage.getItem('token');
    if(!token){
      // 提示
      
     //跳转至登陆页面
   //不能用此方法 目前是路由组件 没有this  vue
    //  this.$router.push('/login')

    router.push('/login');//直接路由跳转
    Message.warning('请先登录');
      return;
    }
    
  }

    next();
  
})


export default router;