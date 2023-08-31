<template>

  <!--
    v-bind:属性   :属性
    input: 标签名
    type: 标签类型 - 标签属性 / 通过不同值指定标签类型
    value: 标签的值 - 标签属性 / document.getElementById("username").value = ?
    class: 样式类 - 标签属性 /
    onclick: 点击事件 - 标签属性 / 动态效果 --
    id: 标签唯一标识 - 标签属性

   -->
  <input v-bind:type="r3.aa" :value="r3.v" :class="r3.s" v-on:click="getValue" id="username">
  <br>
  <button v-on:click="ww">点击切换</button>

</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "First",
  setup() {
    // 改变input类型  redio
    let r1 = 'input'; //radio
    let r2 = ref('checkbox'); //组合式api -- 响应式
    let r3 = reactive({
      aa:'input',
      bb:'input',
      v:'123',
      s:'aa'
    }) //组合式api -- ref和reactive都能够实现数据的响应式，只不过ref更适用于简单的数据，如果数据层级比较深，ref中的内部数据是无法响应式的，所以ref适合简单的数据
       //reactive 通吃

    //点击按钮事件
    const ww = () => {

      //r1 = 'radio' //点击没有任何反应，r1值发生改变，但是没有在html中做出响应
      //r2.value = 'radio' //响应式
      //r3.aa = 'checkbox' // 响应式

      //document.getElementById('username').value = '哈哈' // 可以但是不建议
      r3.v = '嘿嘿'
      r3.s = 'bb'

    }

    const getValue = () => {
      alert(r3.v);
    }


    return {r1,r2,r3,ww,getValue}
  }
}
</script>

<style scoped>
.r1{
  width: 200px;
  height: 200px;
  background-color: darkcyan;
}
.r2{
  width: 300px;
  height: 300px;
  background-color: #92207b;
}
.aa{
  width: 500px;
}
.bb{
  width: 1000px;
  background-color: yellow;
}
</style>