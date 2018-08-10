<template>
    <div class="login-wrap">
        <el-form 
        class="login-form"
        label-position="top" 
        label-width="80px" 
        :model="fromData">
         <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <!-- 给密码框设置回车  native是自己设置的回车事件  表示不是vue的东西 因为vue有自己默认的的组建机制 -->
            <el-input @keyup.enter.native="handleLogin" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
             <el-button type="primary" @click="handleLogin" class="btn">登录</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
//导入axios模块
import axios from 'axios';
export default{
     data() {
         return{
             //绑定文本框数据  与文本框输入的数据是一致的
             formData:{
                 username:'',
                 password:''
             }
         }
     },
     methods:{
        //  async handleLogin(){
        //      var response = await axios.post('http://localhost:8888/api/private/v1/login',this.formData);
            //上面登录绑定该登陆事件
            handleLogin(){
                axios.post('http://localhost:8888/api/private/v1/login',this.formData)
                .then((response)=>{
                    //判断登陆是否成功
                    var status = response.data.meta.status;
                    //定义返回的msg信息
                    var msg = response.data.meta.msg;
                    if(status===200){
                        //登录成功
                        //提示
                         this.$message.success(msg);
                         //记录token
                                 // token是后台响应回来的数据中 带着，拿出来就行
                         var token = response.data.data.token;
                                //存下来 ('名字'，值)
                        SessionStorage.setItem('token',token);
                         //跳转到后台首页
                        
                    }else{
                        //登录失败 
                        //做提示
                         this.$message.error(msg);

                    }
                })
                .catch((err)=>{

                })
            }
         }

     }


</script>
<style scoped>
.login-wrap{
    background-color: #324152;
    height: 100%;
    /* 让表单垂直、水平居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    
    
}
.login-wrap .login-form{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}
.login-wrap .login-form .btn{
    width: 100%;
    
}


</style>

