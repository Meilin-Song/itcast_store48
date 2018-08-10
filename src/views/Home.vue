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
                    <a href="#">退出</a>
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
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                            <el-menu-item index="/users" class="el-icon-menu">&nbsp;&nbsp;用户列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                          <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item index="/roles" class="el-icon-menu">&nbsp;&nbsp;角色管理</el-menu-item>
                        <el-menu-item index="/rights" class="el-icon-menu">&nbsp;&nbsp;权限列表</el-menu-item>

                    </el-submenu>
                    <el-submenu index="3">
                         <template slot="title">
                            <i class="el-icon-location"></i>
                          <span slot="title">商品管理</span>
                        </template>
                         <el-menu-item index="3-1" class="el-icon-menu">&nbsp;&nbsp;商品列表</el-menu-item>
                          <el-menu-item index="3-2" class="el-icon-menu">&nbsp;&nbsp;分类参数</el-menu-item>
                           <el-menu-item index="3-3" class="el-icon-menu">&nbsp;&nbsp;商品分类</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                         <template slot="title">
                            <i class="el-icon-location"></i>
                          <span slot="title">订单管理</span>
                        </template>
                         <el-menu-item index="4-1" class="el-icon-menu">&nbsp;&nbsp;订单列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                         <template slot="title">
                            <i class="el-icon-location"></i>
                          <span slot="title">数据统计</span>
                        </template>
                         <el-menu-item index="5-1" class="el-icon-menu">&nbsp;&nbsp;数据报表</el-menu-item>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default{

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

