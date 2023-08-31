<template>
  <!-- 在vue页面中，template下第一个标签使用div -->
  <div class="box">
    <div class="login-box">
      <div class="title">澳佳微人事管理系统</div>
      <!--  表单    -->
      <div>
        <el-form
            label-width="100px"
            :model="user"
            style="margin-top: 40px"
        >
          <el-form-item label="账号" size="large">
            <el-input v-model="user.username" size="large" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="密码" size="large">
            <el-input type="password" v-model="user.password" size="large" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="验证码" size="large">
            <el-input v-model="user.verify" style="width: 100px;" size="large"/>
            <img :src="url" alt="" style="height: 38px;margin-left: 10px">
            <span style="margin-left: 10px;cursor: pointer" @click="changeVerify">换一个</span>
          </el-form-item>
          <el-button type="success" @click="login" size="large">点击登录</el-button>
        </el-form>
        <br>

      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import http from "@/utils/http";

export default {
  name: "Login",
  setup(){

    // const router = useRouter();
    //
    // const data = reactive({
    //   user:{}
    // })
    //
    // const login = () => {
    //   router.push('/layout')
    // }
    //


    const router = useRouter();

    const data = reactive({
      user:{},
      url: 'http://localhost:8081/createVerify'
    })

    const changeVerify = () => {
      data.url = 'http://localhost:8081/createVerify?'+ Math.random()
    }

    const login = () => {
      console.log(data.user)

      if(data.user.verify == null || data.user.verify === ''){
        ElMessage.error('error')
        return

      }

      http.post('/api/checkVerify?verify='+data.user.verify,{}).then(res => {
        console.log(res)
        if(res){
          http.post('/api/user/checkLogin',data.user).then(res => {
            console.log(res)
            if(res.code === 1){
              sessionStorage.setItem("user",JSON.stringify(res.data))

              ElMessage({
                message: res.msg,
                type: 'success',
              })
              router.push('/layout')
            }else{
              ElMessage.error(res.msg)
            }
          })
        }else{
          ElMessage.error('验证码错误')
        }
      })


    }
    return {...toRefs(data),login,changeVerify}
  }
}
</script>

<style scoped>
.box{
  background-color: darkcyan;
  width: 100%;
  height: 100vh;  /*自适应高度*/
  /* 通过flex布局进行上下居中 */
  display: flex;
  align-items: center;  /* 上下居中 */
  justify-content: center; /* 左右居中 */
  background-image: url("../assets/imgs/bg.webp");
  background-repeat: no-repeat;
  background-size: 100%;
}
.login-box{
  width: 450px;
  height: 350px;
  background:rgba(0,0,0,0.6);
  color: #ffffff;
  padding: 10px;
  /*margin: 0 auto;*/
  text-align: center;
}
.title{
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ffffff;
  font-size: 25px;
  line-height: 50px;
  font-weight: bold;
}
/deep/ .el-form-item__label{
  color: white;
}
</style>