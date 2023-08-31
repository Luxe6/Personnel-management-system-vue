<template>
  <div style="padding: 15px;width: calc(100vw - 231px)">
  <el-button type="success" @click="add">增加用户</el-button>

  <br>
  <br>
  <!--表单-->
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="部门">
      <el-input v-model="form.name" placeholder="精准匹配" clearable />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.mark" placeholder="模糊匹配" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="load">快捷查询</el-button>
    </el-form-item>
  </el-form>


  <el-table :data="list" border style="width: 100%">
    <el-table-column type="index" label="序号" align="center" width="80" />
    <el-table-column prop="name" align="center" label="部门"  />
    <el-table-column prop="mark" align="center" label="描述" />
    <el-table-column label="操作" align="center"  >
      <template #default="scope">
        <el-button size="small" @click="handleEdit( scope.row)">修改</el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <br>
  <el-pagination
      background
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[5,10,15,20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
  <el-dialog v-model="dialogFormVisible" :title="isAdd?'增加用户':'修改用户'">
    <el-form :model="form" label-width="120px">

      <el-form-item label="部门">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.mark"/>
      </el-form-item>


    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
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
  name: "Department",
  setup() {
    const data = reactive({
      form: {
        state: 1
      },
      list: [],
      total: 0, //分页总条数
      pageNum: 1, //当前页
      pageSize: 5, //初始化每页大小
      dialogFormVisible: false,//对话框隐藏
      isAdd: true, //判断当前操作是增加或修改
    })
    const load =() =>{
      http.get('/api/department',{
        params:{
          pageNum:data.pageNum,//当前页
          pageSize:data.pageSize,
          name:data.form.name,
          mark:data.form.mark
        }
      }).then(res => {
        console.log(res)
        data.list=res.data.list
        data.total=res.data.total
      })
    }
    load()

    //处理切换页数
    const handleCurrentChange=(number)=>{
      //取到的页数给pageNum
      data.pageNum=number
      //重新查询数据
      load()
    }

    const handleSizeChange=(number)=>{
      data.pageSize=number

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
        url: '/api/department',
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

    const handleDelete = (row) =>{
      http.delete('/api/department/'+row.id,{}).then(res =>{
        if (res.code == 1){
          ElMessage({
            message:res.msg,
            type:'success'
          })
        }else {
          ElMessage.error(res.msg)
        }
      })

      load()
    }
    //点击修改按钮
    const handleEdit=(row)=>{
      //改变标识
      data.isAdd=false

      //数据回显-不推荐

      data.form = row
      data.dialogFormVisible=true
    }

    return{...toRefs(data),load,handleCurrentChange,handleSizeChange,add,handleDelete,saveOrUpdate,handleEdit}
  }
}


</script>

<style scoped>

</style>