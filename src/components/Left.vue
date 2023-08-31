<template>
  <div style="width: 200px;">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/layout/user">用户信息</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>员工管理</span>
        </template>
        <el-menu-item index="/layout/employee">员工信息</el-menu-item>
        <el-menu-item index="/layout/position">职位信息</el-menu-item>
        <el-menu-item index="/layout/title">职称信息</el-menu-item>
        <el-menu-item index="/layout/department">部门信息</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Coin /></el-icon>
          <span>工资管理</span>
        </template>
        <el-menu-item index="3-1">工资信息</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Left"
}
</script>

<style scoped>

</style>