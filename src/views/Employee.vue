<template>
  <div style="padding: 15px;width: calc(100vw - 231px)">
    <!--增加按钮 -->
    <el-button type="success" @click="add">增加用户</el-button>
    <br>
    <br>

    <!--表单 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-row>
      <el-form-item label="用户名">
        <el-input v-model="form.name" style="width: 150px;" placeholder="精准匹配" clearable />
      </el-form-item>
      <el-form-item label="所属部门" >
        <el-select v-model="form.departmentId" clearable   placeholder="选择部门">
<!--          <el-option label="人事部" value="1" />-->
<!--          <el-option label="研发部" value="2" />-->
          <el-option v-for="item in departmentList" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职位" >
        <el-select v-model="form.positionId" clearable   placeholder="选择职位">
<!--          <el-option label="Zone one" value="1" />-->
<!--          <el-option label="Zone two" value="2" />-->
          <el-option v-for="item in positionList" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      </el-row>

      <el-row>
      <el-form-item label="入职日期" >
        <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="起始日期"
            :size="size"
            format="YYYY-MM-DD hh:mm:ss"
            value-format="YYYY-MM-DD hh:mm:ss"
        />
<!--        &nbsp;&nbsp;-&nbsp;&nbsp;-->
      </el-form-item>
        <el-form-item label="离职日期" >
        <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="结束日期"
            :size="size"
            format="YYYY-MM-DD hh:mm:ss"
            value-format="YYYY-MM-DD hh:mm:ss"
        />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="load">快捷查询</el-button>
      </el-form-item>

      </el-row>
    </el-form>

    <!--表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" align="center" width="60" label="序号" />
      <el-table-column prop="name" align="center"  width="100" label="名称" />
      <el-table-column prop="sex" align="center" width="60" label="性别" />
      <el-table-column prop="birthdayDate" width="100" align="center" label="出生日期" />
      <el-table-column prop="politicsStatus" width="100" align="center" label="政治面貌" />
      <el-table-column prop="nation" width="60" align="center" label="民族" />
      <el-table-column prop="nativePlace" width="60" align="center" label="籍贯" />
      <el-table-column prop="email" width="120" align="center" label="邮箱" />
      <el-table-column prop="address" width="100" align="center" label="联系地址" />
      <el-table-column prop="position.name" width="100"  align="center" label="职位" />
      <el-table-column prop="title.name" width="100" align="center" label="职称" />
      <el-table-column prop="department.name" width="100" align="center" label="部门" />
      <el-table-column prop="phone" width="100" align="center" label="联系方式" />
      <el-table-column prop="employeeNumber" width="100" align="center" label="工号" />
      <el-table-column prop="education" width="100" align="center" label="学历" />
      <el-table-column prop="graduationInstitution" width="150" align="center" label="毕业院校" />
      <el-table-column prop="professionalName" width="100" align="center" label="专业名称" />
      <el-table-column prop="hireDate" width="100" align="center" label="入职日期" />
      <el-table-column prop="probationDate" width="100" align="center" label="转正日期" />
      <el-table-column prop="contractStartDate" width="100" align="center" label="起始日期" />
      <el-table-column prop="contractEndDate" width="100" align="center" label="结束日期" />
      <el-table-column prop="idcard" width="150" align="center" label="身份证号" />
      <el-table-column prop="employmentType" width="100" align="center" label="聘用形式" >
        <template #default="scope">
          {{scope.row.emoloyment == 0?'劳动合同':'劳务合同'}}
        </template>
      </el-table-column>
      <el-table-column prop="maritalStatus" width="100" align="center" label="婚姻状况" >
        <template #default="scope">
          <span v-if="scope.row.maritalStatus==0">未婚</span>
          <span v-if="scope.row.maritalStatus==1">已婚</span>
          <span v-if="scope.row.maritalStatus==2">离异</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>

          <el-popconfirm title="你确定删除么?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button size="small" type="danger"  >删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <!-- 增加数据的对话框 -->
    <el-dialog v-model="dialogFormVisible" width="80%" :title="isAdd?'增加员工':'修改员工'" >
      <el-form :model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" >
              <template #prefix>
                <el-icon class="el-input__icon"><EditPen /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1"  >男</el-radio>
              <el-radio :label="0" >女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
<!--            <el-input v-model="form.birthdayDate" />-->
            <el-date-picker
                v-model="form.birthdayDate"
                type="date"
                placeholder="日期"
                :size="size"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="form.politicsStatus" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="民族">
            <el-input v-model="form.nation" />
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.nativePlace" />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职位">
            <el-select v-model="form.positionId" clearable   placeholder="选择职位">
              <el-option v-for="item in positionList" :label="item.name"  :value="item.id"  />
            </el-select>
          </el-form-item>
          <el-form-item label="职称">
            <el-select v-model="form.titleId" clearable   placeholder="选择职称">
              <el-option v-for="item in titleList" :label="item.name"  :value="item.id"  />
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="form.departmentId" clearable   placeholder="选择部门">
              <el-option v-for="item in departmentList" :label="item.name"  :value="item.id"  />
            </el-select>
          </el-form-item>

          <el-form-item label="电话号码">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="工号">
            <el-input v-model="form.employeeNumber" />
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="form.education" clearable   placeholder="学历">
              <el-option label="幼儿园"  value="幼儿园"  />
              <el-option label="小学"  value="小学"  />
              <el-option label="初中"  value="初中"  />
              <el-option label="高中"  value="高中"  />
              <el-option label="大学"  value="大学"  />
              <el-option label="研究生"  value="研究生"  />
              <el-option label="博士生"  value="博士生"  />
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="form.graduationInstitution" />
          </el-form-item>
          <el-form-item label="专业名称">
            <el-input v-model="form.professionalName" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入职日期" >
            <el-date-picker
                v-model="form.hireDate"
                type="date"
                placeholder="日期"
                :size="size"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="转正日期" >
            <el-date-picker
                v-model="form.probationDate"
                type="date"
                placeholder="日期"
                :size="size"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="合同日期" >
            <el-date-picker
                v-model="form.contractStartDate"
                type="date"
                placeholder="合同起始日期"
                :size="size"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="合同日期" >
            <el-date-picker
                v-model="form.contractEndDate"
                type="date"
                placeholder="合同终止日期"
                :size="size"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="身份证号">
            <el-input v-model="form.idcard" />
          </el-form-item>
          <el-form-item label="聘用形式">
            <el-radio-group v-model="form.employmentType">
              <el-radio :label="1"  >劳动合同</el-radio>
              <el-radio :label="0" >劳务合同</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻状况"  width="400">
            <el-radio-group v-model="form.maritalStatus">
              <el-radio :label="0"  >未婚</el-radio>
              <el-radio :label="1" >已婚</el-radio>
              <el-radio :label="2" >离异</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
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
  name: "Employee",
  setup(){
    const data = reactive({
      list:[],
      form:{},
      departmentList:[],
      positionList:[],
      titleList:[],
      dialogFormVisible:false,//对话框隐藏
      isAdd:true//判断当前操作是增加或修改
    })

    //保存数据的方法
    const saveOrUpdate =()=> {
      console.log(data.form)

      http({
        method: data.isAdd ? 'post' : 'put',
        url: '/api/employee',
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

    const queryDepartment = () => {
      http.get('/api/department/queryDepartmentList',{}).then(res => {
        data.departmentList = res.data
      })
      console.log(data.departmentList);
    }
    queryDepartment();

    const queryPosition = () => {
      http.get('/api/position/queryPositionList',{}).then(res => {
        data.positionList = res.data
      })
    }
    queryPosition();

    const queryTitle = () => {
      http.get('/api/title/queryTitleList',{}).then(res => {
        data.titleList = res.data
      })
    }
    queryTitle();

    const load = () => {
      http.get('/api/employee',{
        params:{
          pageNum:data.pageNum,
          pageSize:data.pageSize,
          name:data.form.name,
          departmentId:data.form.departmentId,
          positionId:data.form.positionId,
          titleId:data.form.titleId,
          startDate:data.form.startDate,
          endDate:data.form.endDate
        }
      }).then(res => {
        data.list = res.data.list
      })
    }
    load()

    //点击添加按钮
    const add=()=>{
      //改变标识
      data.isAdd=true
      data.dialogFormVisible = true

    }

    const handleCurrentChange = (number) => {
      data.pageNum = number
      load()
    }
    const handleSizeChange = (number) => {
      data.pageSize = number
      load()
    }
    const handleClose = () => {
      data.form = {state:1}
      data.dialogFormVisible = false
    }

    const handleDelete = (row) => {
      http.delete('/api/employee/'+row.id,{}).then(res => {
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

    //点击修改按钮
    const handleEdit=(row)=>{
      //改变标识
      data.isAdd=false

      //数据回显-不推荐

      http.get('/api/employee/'+row.id,{}).then(res => {
        console.log(res)
        data.form = res.data
      })

      // data.form = row
      data.dialogFormVisible=true
    }

    return {
      ...toRefs(data),
      load,
      add,
      handleClose,
      handleSizeChange,
      handleCurrentChange,
      saveOrUpdate,
      handleDelete,
      handleEdit
    }
  }
}
</script>

<style scoped>
/deep/ .el-form-item__content{
  width: 200px;
  height: 33px;
}
/deep/ .el-radio{
  margin-right: 15px;
}
</style>