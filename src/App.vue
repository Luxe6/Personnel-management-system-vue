<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link>-->
<!--    |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
<!--  <First></First>-->
<!--  <vue01></vue01>-->
<!--  <login></login>-->
<!--  <Demo></Demo>-->
<!--  <layout></layout>-->
  <router-view></router-view>
</template>

<script>
import First from "@/demo/First";
import vue01 from "@/demo/vue01";
import Login from "@/views/Login";
import Demo from "@/views/Demo";
import Layout from "@/components/Layout";

export default {
  name: "App",
//将demo中的First组件在app 中声明
  components: {
    Layout,
    First,
    vue01,
    Login,
    Demo,
  }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

/*nav {*/
/*  padding: 30px;*/
/*}*/

/*nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>
