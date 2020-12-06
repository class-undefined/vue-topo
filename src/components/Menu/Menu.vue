<template>
  <el-menu>
    <el-submenu v-for="(item,index) in menuItems" :key="index" :index="index">
      <template slot="title">
        {{ item.itemName }}
      </template>
      <el-menu-item-group>
        <el-menu-item>

        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  props: {
    menuItems: {
      type: Array,
      default() {
        return [
          {
            itemName: "分类一",
            icons: [
              {title: '图标一', desc: '描述文本', path: '文件路径'},
              {title: '图标二', desc: '描述文本', path: '文件路径'}]
          },
          {
            itemName: "分类二",
            icons: [
              {title: '图标一', desc: '描述文本', path: '文件路径'},
              {title: '图标二', desc: '描述文本', path: '文件路径'}]
          },

        ]
      }

    }
  }
}
</script>

<style scoped>

</style>