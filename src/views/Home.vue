<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                      <img src="@/assets/css/logo.png" alt="">
                   
                </el-col>
                <el-col :span="19" class="title">
                    <span>电商后台管理系统</span>
                </el-col>
                <el-col :span="1" class="logout">
                    <a @click.prevent="handleOut" href="#">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                <!-- 
                    el-menu-item 子选项

                    default-active指定选中某一项，必须是子选项index的值。

                    unique-opened 布尔值 直接写自己名字就行 默认只有一项展开

                    router  布尔值 是否使用vue-router模式，启用该模式，导航会以index作为路径path进行跳转


                     -->
                <el-menu
                    style="height:100%"
                    default-active="/users"
                    unique-opened
                    router >
                    <el-submenu 
                        v-for="item in menus"
                        :key="item.id"
                        :index="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                            <el-menu-item 
                            v-for="item1 in item.children"
                            :key="item1.id"
                            :index="'/'+ item1.path" 
                            class="el-icon-menu">&nbsp;&nbsp;{{item1.authName}}</el-menu-item>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main class="main">
                <!-- 路由占位符 路由组件渲染这个页面 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default{
        data(){
            return {
                menus:[]   //准备菜单的数组
            }
            
        },
        //在页面加载之前，就必须判断登录页面跳过来的有没有带token
        // beforeCreate(){
        //         //取token
        //         var token = sessionStorage.getItem('token');
        //         //判断 （前端无法判断token的值，只能判断是否存在，只有后端才能判断token值）
        //         if(!token){
        //             //给出警告提示框
        //             this.$message.warning('请先登录');
        //             //token不存在  跳回登录页面
        //             this.$router.push('/login');
        //         }
        // },
        created(){
            this. loadMenus();
        },
        methods:{
            handleOut(){
                //提示框
                this.$message.success('退出成功');
                //清除token
                // sessionStorage.removeItem('token');//只移除这一个
                sessionStorage.clear(); //clear强力清除
                //跳转到登录页面
                this.$router.push('/login')

            },
            //加载菜单
            async loadMenus(){
                const response = await this.$http.get('menus');

                //此处省略判断status状态的常规操作
                this.menus = response.data.data;

            }

        }





    }

</script>
<style scoped>
.container{
    height:100%;
}
 .header{
    background-color: #b3c0d1;
    padding: 0;
}
.header .title{
    color: white;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.header .logout a{
    line-height: 60px;
    color: orange;
    text-decoration: none;
}

</style>

