<template>
  <el-menu>
    <el-submenu v-for="(item,index) in menuItems" :key="index" :index="index.toString()">
      <template slot="title">
        {{ item.itemName }}
      </template>
      <el-menu-item-group>
        <!--tooltip-->
        <el-tooltip
            v-for="(iconItem) in item.icons"
            :key="iconItem.path"
            effect="dark"
            :content="iconItem.desc"
            placement="right">
          <!--          菜单项-->
          <el-menu-item>
            <!--            svg图标-->
            <div draggable="true"
                 @dragstart="dragstartHandle($event,iconItem,'icon-' + iconItem.path)">
              <svg-icon :icon-class="iconItem.path"/>
            </div>

          </el-menu-item>
        </el-tooltip>

      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
import config from "@/icons/config";

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
  },
  data() {
    return {
      svg: config.svg,
      index: 0
    }
  },
  methods: {
    dragstartHandle(e, iconItem,svgId) {

      /*将拖动目标的信息转换成json文本存放到事件中*/
      let data = JSON.stringify({path: iconItem.path, title: iconItem.title, desc: iconItem.desc,svgId:svgId})
      e.dataTransfer.setData("text/plain",data)
    },
  },
  created() {
    /*将该组件的实例加入至components*/
    this.$set(this.components,'Menu',this)
  }
}
</script>

<style scoped>
.icon-cell {
  /*display: inline-block;*/

}
</style>