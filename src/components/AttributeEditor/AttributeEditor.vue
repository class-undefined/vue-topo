<template>
  <el-form class="attribute-editor-form"
           label-width="5em"
           label-position="right"
           ref="form">
    <el-form-item label="标签名：">
      <el-input v-model="svgData.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AttributeEditor",
  props:{
    svgData:{
      type:Object,
      required:false,
      default(){
        return {
          title:'未选择',
          name:'null',
          desc:'null',
          mouse:{
            x:null,
            y:null
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.attribute-editor-form{

  border:2px solid rgb(255,255,255);
  border-radius: 2px;
}
</style>