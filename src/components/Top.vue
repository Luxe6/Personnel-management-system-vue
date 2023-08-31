<template>
  <div class="top" >
    <div class="title">澳佳微人事管理系统</div>
    <div style="flex: 1;"></div>
    <div class="welcome">
      <el-dropdown :hide-on-click="false">
    <span class="el-dropdown-link">
      欢迎  <span v-if="user != null" >{{user.nikeName}}</span>  登录<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog v-model="dialogFormVisible" title="修改密码" draggable  @close="handleClose">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="120px">

        <el-form-item label="原始密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" autocomplete="off" v-model="form.newPassword" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input type="password" autocomplete="off" v-model="form.confirmPassword" />
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="sub(ruleFormRef)">
          修改密码
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import http from "@/utils/http";
import {ElMessage} from "element-plus";

export default {
  name: "Top",
  setup(){
    const data = reactive({
      user:{},
      dialogFormVisible:false,
      form:{}
    })

    const validatePass = (rule,value,callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (value !== data.form.newPassword) {
        callback(new Error("两次密码不一致!"))
      } else {
        callback()
      }
    }
    //验证部分
    const ruleFormRef = ref()
    const rules = reactive({
      password:[{ required: true, message: '原始密码不能为空', trigger: 'blur'}],
      newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur'}],
      confirmPassword: [{ validator: validatePass, trigger: 'blur' }],
    })


    //读取存储的用户信息
    // data.user = JSON.parse(sessionStorage.getItem('user'));
    let user = sessionStorage.getItem('user');
    if(!(user == null || user == '')){
      data.user = JSON.parse(user);
    }

    const router = useRouter();

    const logout = () => {
      //清理信息
      sessionStorage.clear()
      //跳转到登录
      router.push("/login")
    }

    const updatePassword = () => {
      //弹出窗口{原始密码 - 新密码 - 确认新密码}
      data.dialogFormVisible = true
    }

    const sub = (v) => {

      if (!v) return
      v.validate((valid) => {
        if (valid) {
          //验证通过
          //获取当前登录的id
          data.form = {
            password:data.form.password,
            newPassword:data.form.newPassword,
            id:data.user.id
          }
          console.log(data.form)
          http.post('/api/user/updatePassword',data.form).then(res => {
            if(res.code == 1){
              ElMessage({
                message: res.msg,
                type: 'success',
              })
              //关闭对话框和清理数据
              data.form = {}
              data.dialogFormVisible = false
            }else{
              ElMessage.error(res.msg)
            }
          })

        } else {
          console.log('验证失败!')
          return false
        }
      })

      /**/

    }

    return {...toRefs(data),logout,updatePassword,sub,ruleFormRef,rules}
  }
}
</script>

<style scoped>
.top{
  background-color: darkcyan;
  width: 100%;
  height: 80px;
  display: flex;
}
.title{
  margin-left: 30px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  font-family: 华文楷体;
  justify-content: center;
  align-items: center;
  display: flex;
  text-shadow: 2px 2px #000;
}
.welcome{
  justify-content: center;
  align-items: center;
  color: white;
  width: 150px;
  display: flex;
}
.el-dropdown{
  color: white;
  cursor: pointer;
}
</style>