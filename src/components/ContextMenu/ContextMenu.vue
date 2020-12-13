<template>
  <div
      class="context-menu"
      v-if="isShow"
      oncontextmenu="return false"
      :style="{left:x + 'px',top:y + 'px'}">
    <ul>
      <li @click="click(item)" v-for="item in menuList" :key="item.code">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>

</template>

<script>
import config from "@/icons/config";
import menuConfig from "@/components/ContextMenu/config"
export default {
  name: "ContextMenu",
  data() {
    return {
      // cellCheckEventData:null,
      x: 0,
      y: 0,
      item:null,
      isShow: false
    }
  },
  /*绑定了接受事件：cellCheck、drwaBoardClicked*/
  created() {
    /*将组件信息添加到vue全局变量，方便操作此实例*/
    this.$set(this.components,'ContextMenu',this)
  },
  methods: {
    /*菜单栏单击事件：发送deleteCell消息，携带参数为组件id 在DrawBoard组件中的create事件中接受该事件*/
    click(menuItem) {
      this.components.DrawBoard.contextMenuClick({menuItem,'svgCellItemId':this.item.id})
    },
    /*组件被右击后，会通过this.components.ContextMenu.cellCheck来调用此函数*/
    show(res){
      this.x = res.e.pageX + config.svg.width
      this.y = res.e.pageY
      this.item = res.item
      this.isShow = true
    },
    /*如果画板被单击，则不显示该组件*/
    hiddenContextMenu(){
      this.isShow = false
    }
  },
  computed:{
    menuList(){
      return menuConfig.menuItem
    }
  }
}
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: #FFF;
  box-shadow: 1px 2px 6px 1px rgba(0,0,0,0.2);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  cursor: pointer;
  padding: 10px 20px;
  color: #494a4a;
  font-size: 14px;
}
li:hover {
  background-color: #D9ECFF;
}
</style>