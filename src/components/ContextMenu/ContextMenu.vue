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
    /*接收组件被右击的事件消息*/
    // eslint-disable-next-line no-undef
    globalEvent.$on('cellCheck', res => {
      // this.cellCheckEventData = res
      this.x = res.e.pageX + config.svg.width
      this.y = res.e.pageY
      this.item = res.item
      this.isShow = true
    })
    /*接受画板被单击的事件消息*/
    // eslint-disable-next-line no-undef
    globalEvent.$on('drawBoardClicked',()=>{
      this.isShow = false
    })
  },
  methods: {
    /*菜单栏单击事件：发送deleteCell消息，携带参数为组件id 在DrawBoard组件中的create事件中接受该事件*/
    click(menuItem) {
      // eslint-disable-next-line no-undef
      globalEvent.$emit('contextMenuClick', {menuItem,'svgCellItemId':this.item.id})
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