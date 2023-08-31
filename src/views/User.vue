<template>

  <div style="padding: 15px">
    <!--增加按钮 -->
    <el-button type="success" @click="add">增加用户</el-button>
    <br>
    <br>
    <!--表单 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入完整的用户名" clearable />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nikeName" placeholder="请输入昵称" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="load">快捷查询</el-button>
      </el-form-item>
    </el-form>

    <!--表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="nikeName" label="昵称" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="state" label="状态" >
      <template #default="scope">
        <!--         {{scope.row.state == 1?'正常':'异常'}} -->
        <span v-if="scope.row.state == 0" style="color: #cccccc">禁用</span>
        <span v-if="scope.row.state == 1" style="color: #29b440">正常</span>
        <span v-if="scope.row.state == 2" style="color: #b94262">离职</span>
      </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="address" label="操作" >
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>

        <el-popconfirm title="你确定删除吗？" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
<!--        <el-button-->
<!--            size="small"-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      </template>
      </el-table-column>
    </el-table>
    <br>
    <!--分页 -->
    <el-pagination
        background
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogFormVisible" :title="isAdd?'增加用户':'修改用户'" draggable @close="handleClose">
      <el-form :model="form" label-width="120px">

        <el-form-item label="用户账号">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="用户密码">
          <span style="color: coral" v-if="isAdd">初始密码123456，登录后自行修改</span>
          <span style="color: coral" v-if="!isAdd">右上角修改密码</span>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nikeName"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone"/>
        </el-form-item>

        <el-form-item label="帐号状态">
          <el-radio-group v-model="form.state">
            <el-radio :label="1">正常</el-radio>
            <el-radio :disabled ="isAdd " :label="0" >禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-date-picker
              v-model="form.createTime"
              type="datetime"
              placeholder="选择时间"
              format="YYYY-MM-DD hh:mm:ss"
              value-format="YYYY-MM-DD hh:mm:ss"
          />
        </el-form-item>


      </el-form>
      <template #footer>
          <span class="dialog-footer">
<!--            <el-button @click="dialogFormVisible = false">取消</el-button>-->
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">
              保存
            </el-button>
          </span>
      </template>
    </el-dialog>

  </div>


</template>

<script>
import {reactive, toRefs} from "vue";
import http from "@/utils/http";
import {ElMessage} from "element-plus";

export default {
  name: "User",
  setup(){
    const data = reactive({
      //表单的内容
      form:{},
      list:[],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible:false,//对话框隐藏
      isAdd:true, //判断当前操作是增加或修改
    })

    const load = () => {
      http.get('/api/user',{
        params:{
          pageNum:data.pageNum,
          pageSize:data.pageSize,
          username: data.form.username,
          nikeName: data.form.nikeName
        }
      }).then(res => {
        console.log(res)
        data.list = res.data.list
        data.total= res.data.total
      })
    }
    load()

    const handleCurrentChange = (number) => {
      data.pageNum = number
      load()
    }

    const handleSizeChange = (number) => {
      data.pageSize = number
      load()
    }

    //点击添加按钮
    const add=()=>{
      //改变标识
      data.isAdd=true
      data.dialogFormVisible = true

    }


    //保存数据的方法
    const saveOrUpdate =()=> {
      console.log(data.form)

      http({
        method: data.isAdd ? 'post' : 'put',
        url: '/api/user',
        data: data.form
      }).then(res => {
        if (res.code == 1) {
          ElMessage({
            message: res.msg,
            type: 'success'
          })
        } else {
          ElMessage.error(res.msg)
        }
        //对话框关闭
        data.dialogFormVisible = false;
        data.form = {state: 1}
        //刷新最新数据
        load()
      })

    }


    //点击修改按钮
    const handleEdit=(row)=>{
      //改变标识
      data.isAdd=false

      //数据回显-不推荐

      http.get('/api/user/'+row.id,{}).then(res => {
        console.log(res)
        data.form = res.data
      })

      // data.form = row
      data.dialogFormVisible=true
    }

    const handleClose = () => {
      data.form = {state:1}
      data.dialogFormVisible = false
    }

    const handleDelete = (row) => {
      http.delete('/api/user/'+row.id,{}).then(res => {
        if(res.code == 1){
          ElMessage({
            message: res.msg,
            type: 'success',
          })
      }else{
        ElMessage.error(res.msg)
      }
    })
      load()
    }

    return {...toRefs(data),load,handleCurrentChange,handleSizeChange,add,saveOrUpdate,handleEdit,handleClose,handleDelete}
  }
}
</script>

<style scoped>

</style>