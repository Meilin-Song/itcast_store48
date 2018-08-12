<template>
    <el-card class="card">
        <!-- //面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
            <!-- 输入框 -->
        <el-row class="searchRow">
            <el-col :span="24">
                <!-- 输入框 -->
             <el-input placeholder="请输入内容" class="searchInput">
                  <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
                 <!-- 按钮 -->
             <el-button type="success">成功按钮</el-button>
            </el-col>
        </el-row>
            <!-- 表格 -->
            <!-- v-bind:data="tableData"
                v-bind给标签属性传值  也可以传自定义属性的值 -->
        <el-table
            :data="data"
            style="width: 100%"
            stripe
            border>
             <el-table-column
                type="index"
                width="50">
             </el-table-column>
             <!-- prop指这列绑定的对应数据 -->
           
            <el-table-column
                prop="username"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
             <el-table-column
                prop="mobile"
                label="电话"
                width="180">
            </el-table-column>
            <el-table-column
                label="时间"
                width="180">

                 <template slot-scope="scope">
                     {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
                 </template>
            </el-table-column>
            <el-table-column
                
                label="用户状态"
                width="80">
                 <template slot-scope="scope">
                     <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                 </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <!--scope是一个对象，scope.row是它的属性
                     scope.row 是当前行绑定的数据对象 ,
                     scope.index   当前索引-->
                      <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            plain>
                        </el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            plain>
                        </el-button>
                        <el-button
                            type="success"
                            icon="el-icon-check"
                            size="mini"
                            plain>
                        </el-button>

                    
                </template>
            </el-table-column>
            
    </el-table>
    </el-card>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
             return {
                 data:[],
                 value1: true,
                 value2: true
             }

        },
        //创建好页面  调用该函数 发请求
        created(){
            this.loadData();
        },
        methods:{
            async loadData(){
                  //请求数据的时候 在请求头 添加Authorization=token  带上token
                 var token = sessionStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = token;
                
                //发送请求
                var response = await axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
                // console.log(response);
                
              
                //对象解构取值
                // var {users:{username,create_time,mobile,email,mg_state}} = response.data.data;

                //将请求的需求结果赋值给data数据
                var {meta:{status,msg}} = response.data;
                // console.log(status)
                if(status===200){
                    //获取成功 展示列表
                    this.data =response.data.data.users;
                    // console.log(this.data)

                }else{
                    //获取数据失败
                    this.$message.error(msg);
                }
                

            }
          
         }
 
    }
    
</script>
<style>
.card{
    height: 100%;

}
.searchInput{
    width: 300px;

}
.searchRow{
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>
