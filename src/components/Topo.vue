<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu/>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/Menu/Menu";

export default {
  name: "Topo",
  components: {
    Menu
  },
  data() {
    return {
      menuItems: [
        {
          itemName: "分类一",
          icons: [
            {title: '图标一', desc: '描述文本', path: '文件路径'},
            {title: '图标二', desc: '描述文本', path: '文件路径'}]
        },
        {
          itemName: "分类二",
          icons: [
            {title: '图标三', desc: '描述文本', path: '文件路径'},
            {title: '图标四', desc: '描述文本', path: '文件路径'}]
        },]
    }
  }

}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>