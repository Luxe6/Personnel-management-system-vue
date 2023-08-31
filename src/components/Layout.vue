<template>

  <div>

    <!-- 头部分 -->
    <div class="top">
      <Top></Top>
    </div>
    <!-- 主体部分 -->
    <div class="body">
      <!-- 主体左部分 -->
      <div class="left">
        <Left></Left>
      </div>
      <!-- 主体右部分 -->
      <div class="right">
        <router-view></router-view>
      </div>

    </div>

  </div>


</template>

<script>
import Top from "@/components/Top";
import Left from "@/components/Left";
import Demo from "@/views/Demo";

export default {
  name: "Layout",
  components:{
    Top,
    Left,
    Demo
  }
}
</script>

<style scoped>
.top{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #ccc;
}
.body{
  width: 100%;
  height: calc(100vh - 81px);
  display: flex; /* 使用css中的flex流式布局 */
}
.left{
  width: 200px;
  height: calc(100vh - 81px);
  display: flex;
  border-right: 1px solid #ccc;
}
.right{
  flex: 1; /* 剩余宽高都自适应 */
}
</style>