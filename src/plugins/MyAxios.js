import axios from "axios";

//const定义常量  不可变的。
//先定义一个对象，是因为vue组件机制规定必须有一个insta方法，所以先顶一个对象，才有的方法
const MyAxios = {};

MyAxios.install = function (Vue) {
  

    //设置axios基地址
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/';
    
    //设置请求拦截器
    //在axios每次发送请求前设置token

    axios.interceptors.request.use(function(config){
      //  config是一个对象 里面有相关的请求信息
      if(config.url.toLocaleLowerCase()!=='login'){
         //config.url是请求的路径
         const token = sessionStorage.getItem('token');
         config.headers.Authorization = token;
      }
      return config;
    },function(error){
      return Promise.reject(error);
    })


    
    
    
    // 4. 添加实例方法
    Vue.prototype.$http=axios;
      // 逻辑...
    
  }


  //导出对象
  export default MyAxios;