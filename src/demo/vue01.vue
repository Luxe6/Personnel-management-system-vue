<template>
  <div>
    man<input type="radio" name="sex" value="man" v-model="data.sex">
    woman<input type="radio" name="sex" value="woman" v-model="data.sex">
  </div>
  <div>
    <span v-for="(item,index) in data.hobbies">
      {{item}}<input type="checkbox" name="hobbies" :value="item" v-model="data.selectHobbies">
    </span>
    {{data.selectHobbies}}
  </div>
  <div>
    <select name="f" v-mmodel="data.sel">
      <option value="" Pleast select></option>
      <option v-for="item in data.list" :value="item">{{item}}</option>
    </select>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "vue01",
  setup() {
    const data = reactive({
      sex:"man",

      hobbies:['1','2','3','4'],
      selectHobbies:[],

      list:['1','2','3','4'],
      sel:'1'
    })


    return {
      data,
    }
  }
}
</script>

<style scoped>

</style>