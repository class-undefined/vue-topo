<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu :menuItems="menuItems"/>
      </el-aside>
      <el-container>
        <el-main class="el-main">
          <draw-board></draw-board>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/Menu/Menu";
import DrawBoard from "@/components/DrawBoard/DrawBoard";
export default {
  name: "Topo",
  components: {
    DrawBoard,
    Menu
  },
  data() {
    return {
      menuItems: [
        {
          itemName: "分类一",
          icons: [
            {title: '图标一', desc: '描述文本', path: '1'},
            {title: '图标二', desc: '描述文本', path: '2'}]
        },
        {
          itemName: "分类二",
          icons: [
            {title: '图标三', desc: '描述文本', path: '3'},
            {title: '图标四', desc: '描述文本', path: '4'}]
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
  /*text-align: center;*/
  position: relative;
  /*line-height: 160px;*/
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