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
             <el-input 
             v-model="searchValue"
             placeholder="请输入内容" class="searchInput" 
             clearable>
                  <el-button 
                  @click="handleSearch"
                  slot="append"                icon="el-icon-search">
                   </el-button>
            </el-input>
                 <!-- 按钮 -->
             <el-button 
                @click="addUserDialogFormVisible = true"
                type="success"
                >添加</el-button>
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
                     <!-- 开关按钮改变用户状态 -->
                     <el-switch
                        @change="handleChange(scope.row)"
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
                            plain
                            @click ="openEditDialog(scope.row)">
                        </el-button>
                        <el-button
                            @click="handleDelete(scope.row.id)"
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            plain>
                        </el-button>
                        <el-button
                            @click="handleOpenSetRoleDialog(scope.row)"
                            type="success"
                            icon="el-icon-check"
                            size="mini"
                            plain>
                        </el-button>

                    
                </template>
            </el-table-column>
            
    </el-table>

    <!-- 分页 
    page-count  总页数
    pager-count 页码按钮的数量，当总页数超过该值时会折叠
    layout 布局  里面是功能  固定的参数写法 不需要可以去掉
    -->
    <!-- 绑定data中的数据 -->
    <el-pagination
        @size-change="handleSizeChange"  
        @current-change="handleCurrentChange"
        :page-sizes="[2, 4, 6, 8]"   
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pagesize"
        :current-page="pagenum"
        :pager-count="9"
        :total="count"
        >
    </el-pagination>

        <!-- 添加用户的对话框 -->
    <el-dialog 
        title="添加用户" 
        :visible.sync="addUserDialogFormVisible">
        <!-- sync是双向绑定 -->
            <!-- 绑定form数据 -->
        <el-form 
                ref="addForm"
                :rules="rules"
                :model="form"
                label-width="80px">
                
            <el-form-item label="用户名" prop="username" >
              <el-input 
              v-model="form.username" auto-complete="off">
              </el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input 
              type="password"
              v-model="form.password" auto-complete="off">
              </el-input>
            </el-form-item>

            
            <el-form-item label="邮箱" >
              <el-input 
              type="email"
              v-model="form.email"
               auto-complete="off">
              </el-input>
            </el-form-item>

            <el-form-item label="电话" >
              <el-input 
              v-model="form.mobile"
               auto-complete="off">
              </el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handAdd">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑用户的对话框 (复制添加的会话代码就行)-->
     <el-dialog 
       @close="closeEditUserDialog"
        title="修改用户" 
        :visible.sync="editUserDialogFormVisible">
        <!-- sync是双向绑定 -->
            <!-- 绑定form数据 -->
        <el-form 
                ref="editForm"
                :model="form"
                label-width="80px">
             <el-form-item label="用户名" prop="username" >
              <el-input 
              v-model="form.username" auto-complete="off" readonly>
              </el-input>
            </el-form-item>
            
            <el-form-item label="邮箱" >
              <el-input 
              type="email"
              v-model="form.email"
               auto-complete="off">
              </el-input>
            </el-form-item>

            <el-form-item label="电话" >
              <el-input 
              v-model="form.mobile"
               auto-complete="off">
              </el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editUserDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog 
    title="分配角色" 
    :visible.sync="setRoledialogFormVisible">
        <el-form label-width="100px">
            <el-form-item label="用户名" >
                {{currentName}}
            </el-form-item>
            <el-form-item label="请选择角色" >
            <el-select v-model="currentRoleId" >
                <!-- currentRoleId是当前选择的值，
                    默认和请选择的value保持一致
                    label是展示出来的一个值  
                     value是每一项隐藏的这个角色值
                     请选择不能等于id的值 默认-1  
                    -->
                <el-option 
                label="请选择" 
                :value="-1" 
                disabled></el-option>
                <el-option 
                v-for="item in roles"
                :key="item.id"
                  :label="item.roleName" 
                  :value="item.id">
                </el-option>
               
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setRoledialogFormVisible= false">取 消</el-button>
            <el-button type="primary" @click="handleRole">确 定</el-button>
        </div>
    </el-dialog>


            
    </el-card>
</template>
<script>
   

    export default {
        data() {
             return {
                 //表格渲染数据
                 data:[],

                 //分页数据
                 pagenum:1, //页码  加载页面默认显示第一页
                 pagesize:2,  //每页多少条  加载页面默认2条
                 count:0,//总数 默认0条   后期赋值
                 searchValue:'',
                 //控制添加用户对话框的显示隐藏 布尔值
                 addUserDialogFormVisible:false,
                 editUserDialogFormVisible:false,
                 setRoledialogFormVisible:false,
                  form: {
                        username: '',
                        password:'',
                        email:'',
                        mobile:'',
                        },
                        //表单验证规则
                 rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ]
                     
                 },
                 //绑定下拉框
                 currentRoleId:-1,
                 //分配角色需要的数据  纯展示
                 currentName:'',

                 //发送修改角色请求的时候需要
                 currentUserId:-1,
                 roles:[]
               
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
                this.$http.defaults.headers.common['Authorization'] = token;
                
                //发送请求
                var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
                // console.log(response);
                
              
                //对象解构取值
                // var {users:{username,create_time,mobile,email,mg_state}} = response.data.data;

                //将请求的需求结果赋值给data数据
                var {meta:{status,msg}} = response.data;
                // console.log(status)
                if(status===200){
                    //获取成功 展示列 表
                    this.data =response.data.data.users;
                    //总数
                    this.count = response.data.data.total;
                    //每页条数
                   

                    // console.log(this.data)

                }else{
                    //获取数据失败
                    this.$message.error(msg);
                }
                

            },
            //分页的方法
            handleSizeChange(val) {
                //当前每页显示数量
                this.pagesize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                //val是当前页码
                this.pagenum = val;
                this.loadData();
            },
            //搜索功能
            handleSearch(){
                this.loadData();
            },
            //添加数据功能
            async handAdd(){
                //表单验证 通过才执行下面代码
                this.$refs.addForm.validate(async (valid)=>{
                    //valid是布尔值  表示是否验证成功
                    //成功就执行后面代码
                    if(valid){
                        const response = await this.$http.post('users',this.form);
                        // console.log(response);
                        //判断是否添加成功
                        const { meta: {status,msg} }=response.data;
                        if(status === 201){
                            //添加成功
                            
                            //关闭对话框
                            this.addUserDialogFormVisible=false,
                            //成功提示
                            this.$message.success(msg);
                            //重新加载展示数据
                            this.loadData();

                            //结束后清空表单数据
                            this.$refs.addForm.resetFields();


                        }else{
                            //错误提示
                            this.$message.error(msg);
                        }
                                
                    }else{
                        this.$message.warning('表单验证失败');
                    }
                })
                

            },
            //点击编辑按钮 编辑框展示用户信息
            openEditDialog(user){
                //user是形参用户信息 
                // 点击按钮调用函数 传入实参scope.row

                //先弹出会话框
                this.editUserDialogFormVisible=true;
                //给表单的form数据赋值  显示对话框
                this.form.username = user.username;
                this.form.mobile = user.mobile;
                this.form.email = user.email;
                //存储用户的id
                this.form.id = user.id;
            },
            //点击编辑按钮的确定按钮
            async handleEdit(){
                //发送编辑请求 传入需要修改的数据
                const response =await this.$http.put(`users/${this.form.id}`,{
                    email:this.form.email,mobile:this.form.mobile});
                // console.log(response.data);
                const {meta:{status,msg}} = response.data;
                if(status === 200){
                    //提示成功
                    this.$message.success(msg);
                    //关闭窗口
                    this.editUserDialogFormVisible=false;
                    // this.$refs.editForm.resetFields();

                    //重新加载数据
                    this.loadData();
                    //清空表单(就是data没数据,挨个或循环清空)
                    // this.form.username="";
                    for ( var key in this.form){
                        //key是form的每一项
                        //删除属性值 
                  //【】 表示form中存在的属性
                  // . 表示给form添加属性
                        this.form[key]='';
                    }

                    

                }else{
                    this.$message.warning(msg);
                }

            },
            closeEditUserDialog(){
                //清除表单数据
                for(var i in this.form){
                    this.form[i]='';
                }
            },
            async handleDelete(id) {
                //弹出的提示框

                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    //点击确定按钮 发送删除请求
                  var response = await this.$http.delete(`users/${id}`);

                  const {meta:{status,msg}} = response.data;
                  if(status===200){
                      //处理小问题  最后一页删除完数据 会显示一下
                      if(this.data.length === 1 && this.pagenum !== 1){
                          this.pagenum--;
                       }
                       this.loadData();
                      this.$message.success(msg);
                      this.loadData();
                  }else{
                      this.$message.error(msg);
                      this.loadData();
                  }
                });

                
            },
            //当用户状态改变
            async handleChange(user){
                const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);

                const {meta:{status,msg}} = response.data;

                if(status === 200){
                    this.$message.success(msg);
                    this.loadData();

                }else{
                    this.$message.error(msg); 
                }

            },
            //设置权限
            async handleOpenSetRoleDialog(user){
                this.setRoledialogFormVisible=true;
                this.currentName = user.username;
                    //发送修改角色请求的时候需要
                this.currentUserId = user.id;

                //显示角色列表 请求数据
                const response = await this.$http.get('roles');
                this.roles = response.data.data;

                //获取角色id  自动显示当前角色
                const userResponse = await this.$http.get(`users/${user.id}`);

                this.currentRoleId = userResponse.data.data.rid;

            },
            //改变角色
            async handleRole(){
                const response = await this.$http.put(`users/${this.currentUserId}/role`,{rid:this.currentRoleId});

                //判断响应结果

                const {meta:{msg,status}}=response.data;
                if(status===200){
                    this.$message.success(msg);
                    this.setRoledialogFormVisible=false;

                }else{
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
