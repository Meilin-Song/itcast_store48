<template>
    <el-card class="card">
        <!-- 面包屑导航 -->
        <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
        
        <!-- 表格展示 
             border 加边框
             stripe  斑马纹  隔行阴影效果-->
         <el-table
          class="form"
            :data="data"
            border
            stripe
            style="width: 100%">
              <el-table-column
               type="index"
                label="#"
                width="80">
            </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="180">
            </el-table-column>
            <el-table-column
                label="层级">
                <template slot-scope="scope">
                    <span v-if="scope.row.level=== '0'">一级</span>
                    <span v-else-if="scope.row.level==='1'">二级</span>
                    <span v-else-if="scope.row.level==='2'">三级</span>
                    
                </template>
            </el-table-column>
        </el-table>
                
    </el-card>
</template>
<script>
  
  export default{
      data(){
          return {
              data:[]
          }
      },
      created(){
          this.loadData();
      },
      methods:{
          async loadData(){
              //设置token
            //   var token = sessionStorage.getItems('token');
            //   this.$http.default.headers.common['Authorization']=token;
             const response = await this.$http.get('rights/list');

             const {meta: {status,msg}} = response.data;
             if(status === 200){
                //渲染数据
                this.data = response.data.data;
             }else{
                 this.$message.error(msg);
             }
          }
      }

  }
</script>
<style>
.card{
    height:100%;
    overflow: auto;
}
.form{
    margin-top: 10px;
}
</style>

