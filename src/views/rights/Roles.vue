<template>
    <el-card class="card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
        <!-- 按钮 -->
        <el-row :span="24" class="addRow">
            <el-col>
                <el-button>按钮</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
         <el-table
            v-loading="loading"
            border
            stripe
            :data="data"
            style="width: 100%">
            <!-- 展开行（首列控制展开） -->
            <el-table-column type="expand">
                  <!-- 模板列 -->
                  <!-- 可以给模板列template设置slot-scope属性 获取当前行的信息 -->
                  <template slot-scope="scope">
                      <!-- <el-tag
                            closable
                            :type="success">
                      </el-tag> -->
                      <!-- 遍历生成多行一级权限、
                      scope.row  当前 行 的对象信息
                      scope.row.children 是所有一级权限的数组
                      level1 是 某个一级权限对象  
                      level1.id  是这个对象的属性id
                       -->
                      <el-row
                          class="level1"
                          v-for="level1 in scope.row.children" :key="level1.id">
                          <!-- 一级权限 -->
                          <el-col :span="4">
                              <el-tag
                               @close="handleClose(scope.row,level1.id)"
                                closable>
                                    {{level1.authName}}
                              </el-tag>
                          </el-col>
                          <el-col  :span="20">
                              <!-- 循环每行二级权限 -->
                              <el-row
                                 class="level2"
                                  v-for="level2 in level1.children" :key="level2.id">
                                  <!-- 二级权限 -->
                                  <el-col :span="4">
                                      <el-tag
                                      @close="handleClose(scope.row,level2.id)"
                                      type="success"
                                       closable>
                                          {{level2.authName}}
                                      </el-tag>
                                  </el-col>

                                  <el-col :span="20">
                                       <el-tag 
                                        @close="handleClose(scope.row,level3.id)"
                                       class="level3"
                                            v-for="level3 in level2.children"
                                            :key="level3.id"
                                          closable
                                          type="warning">
                                         {{level3.authName}}
                                        </el-tag>
                                  </el-col>

                              </el-row>
                           </el-col>
                      </el-row>
                      <!-- 没有权限的显示 -->
                      <el-row
                        v-if="scope.row.children.length===0">
                        <el-col :span="24">
                            当前没有任何权限
                        </el-col> 
                      </el-row>

                  </template>
             </el-table-column>
         
            <!-- 加索引列 -->
            <el-table-column
                type="index"
                label="#"
                width="50">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                width="220">
            </el-table-column>
            <el-table-column
                prop="roleDesc"
                label="角色描述"
                width="260">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
              <!-- 操作的内容是模板列 -->
                <template slot-scope="scope">
                    <!--scope是一个对象，scope.row是它的属性
                     scope.row 是当前行绑定的数据对象 ,
                     scope.index   当前索引-->
                      <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            plain
                            >
                        </el-button>
                        <el-button
        
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            plain>
                        </el-button>
                        <el-button
                            @click="handleOpenSetRightsDialog(scope.row)"
                            type="success"
                            icon="el-icon-check"
                            size="mini"
                            plain>
                        </el-button>
                </template>
            </el-table-column>
            </el-table>
      
              <!-- 分配角色权限的对话框 -->
              <el-dialog
                    title="分配权限"
                    :visible.sync="setRightsdialogVisible"
                   >
                    <!-- 树形控件 
                     default-expand-all   默认全部展开
                    show-checkbox  显示选择按钮 -->
                  
                    <el-tree 
                    ref="tree"
                    :data="treeData" 
                    :props="defaultProps"
                    node-key="id"
                    :default-checked-keys="checkedList"
                    default-expand-all
                    show-checkbox
                    ></el-tree>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="setRightsdialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleSetRights">确 定</el-button>
                    </span>
                </el-dialog>

    </el-card>  


   
</template>

<script>
export default {
    data(){
        return {
            data:[],
            loading:true,
            setRightsdialogVisible:false,
            //树的数据
            treeData:[],
            //默认选中的内容
            checkedList:[],
            //点击分配权限时  记录当前要分配的角色id
            currentRoleId:-1,
            //对象：
            defaultProps:{
                label:'authName',       //树节点显示的属性 权限名称
                children:'children'     //树的子节点的属性

            }

        }
       

    },
    created(){
        this.loadData();
    },
    methods:{
        //加载角色列表
        async loadData(){
            var response = await this.$http.get('roles');
            //异步请求完  再停止loading
            this.loading = false;
            const {meta:{msg,status}}=response.data;

            if(status===200){
                //渲染数据
                this.data = response.data.data;
                
            }else{
                this.$message.error(msg);
            }
        },
        //点击tag删除按钮，删除当前角色对应的权限
       async handleClose(role,rightId){

           //返回当前所有拥有的角色信息
           var response = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);

           const {meta : {status,msg}} = response.data;
           if(status === 200){
               //重新渲染页面
               this.$message.success(msg);
            //    this.data = response.data.data;
            //    this.loadData();

            role.children = response.data.data;
               
           }else{
               this.$message.error(msg);
           }
       },
       //点击分配权限的按钮 渲染分配的权限
       async handleOpenSetRightsDialog(role){
            this.currentRoleId = role.id;


           this.setRightsdialogVisible=true;

           //先清空渲染的数组
            this.checkedList=[];

            //请求数据
           const response = await this.$http.get('rights/tree');
           this.treeData = response.data.data;



               
                 //存储当前角色所拥有的权限id 

             role.children.forEach((level1) =>{
                 level1.children.forEach((level2) =>{
                    level2.children.forEach((level3) =>{
                        this.checkedList.push(level3.id);
                   })   
                })
            });
       },
       //点击会话框的确定按钮  处理分配权限
       async handleSetRights(){
           //全选节点的id  以下是数组
           const checkedList = this.$refs.tree.getCheckedKeys();
           const halfCheckedList = this.$refs.tree.getHalfCheckedKeys();

            //拼接数组
            // var arr = checkedList.concat(halfCheckedList);


            //es6的展开拼接数组
            const arr = [...checkedList,...halfCheckedList];


            var str = arr.join(',');

            //第二个参数是逗号分隔的字符串
           const response = await this.$http.post(`roles/${this.currentRoleId}/rights`,{
               rids:arr.join(',')
           });

            const {meta:{status,msg}}= response.data;
            if(status === 200){
               
                this.$message.success(msg);
                 this.setRightsdialogVisible = false;
                 this.loadData();

            }else{
                this.$message.error(msg);
            }

       }

    }

}
</script>

<style>
.card{
    overflow: auto;
}
.addRow{
    margin-top:10px;
    margin-bottom: 10px;
}
.level1{
    margin-bottom:15px; 
}
.level2{
    margin-bottom: 10px;
}
.level3{
    margin-bottom: 8px;
    margin-right: 5px;
}

</style>
