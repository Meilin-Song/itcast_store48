import axios from "axios";

//const定义常量  不可变的。
//先定义一个对象，是因为vue组件机制规定必须有一个insta方法，所以先顶一个对象，才有的方法
const MyAxios = {};

MyAxios.install = function (Vue) {
  

    //设置axios基地址
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/';
    // 4. 添加实例方法
    Vue.prototype.$http=axios;
      // 逻辑...
    
  }


  //导出对象
  export default MyAxios;