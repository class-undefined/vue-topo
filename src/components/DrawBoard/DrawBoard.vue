<template>
  <div @click="divClick">
    <svg class="board"
         ondragover="return false"
         oncontextmenu="return false"
         @mousemove="mousemove"
         @drop="dropHandle">
      <!--    g标签包裹svg实现定位操作-->
      <g v-for="(item,key) in svgNodes" @click="svgCellClicked($event,item)"

         @mouseenter="mouseenter"
         @mousedown="mousedown($event,item)"
         @contextmenu="contextmenu($event,item)"
         :key="key"
         :rel="key"
         :transform="'translate(' + item.data.mouseData.x +',' + item.data.mouseData.y +')'">
        <!--        通过建立一个单独的use层去掉svg-->
        <svg-use

            :iconClass="item.data.svgData.path"></svg-use>
        <!--        {{// item}}-->
        <text :x="svgWidth - 5" :y="svgHeight*1.3" style="text-anchor: end; user-select: none;font-size: 13px">
          {{ item.data.svgData.title }}
        </text>

      </g>

    </svg>
    <context-menu></context-menu>
  </div>

</template>

<script>
import config from "@/icons/config";
import ContextMenu from "@/components/ContextMenu/ContextMenu";

export default {
  name: "DrawBoard",
  components: {
    ContextMenu
  },
  data() {
    return {
      el: undefined,
      mouseCursor: '',
      mouse: {
        x: 0,
        y: 0
      },
      count: 0,//key
      mouseData: {
        x: null,
        y: null
      },//鼠标坐标信息
      svgData: {
        path: '',
        title: '',
        desc: ''
      },//svg信息
      svgNodes: {},//svg节点 Map
      svgLinks:[]//连线节点
    }
  },
  watch: {
    svgNodes() {
      // console.log(this.svgNodes);
    }
  },
  methods: {
    /*接收拖放元素的事件*/
    dropHandle(e) {
      /*  DrawBoard.vue?c315:14 {"path":"3","title":"图标三","desc":"描述文本"}*/
      this.svgData = JSON.parse(e.dataTransfer.getData('text/plain'))//拖放成功则将该信息赋值给svgData
      console.log(this.svgData);
      let iconCellText = document.getElementById(this.svgData.svgId).innerText//use层
      /*将鼠标信息存入mouseData*/
      this.mouseData.x = e.offsetX - config.svg.width / 2;
      this.mouseData.y = e.offsetY - config.svg.height / 2;
      /*定义键值对*/
      let key = this.count
      /*
      {
         svgData:{title,desc,path},
         mouseData:{x,y}
       }
      */
      let value = {
        /*{title,desc,path}*/
        svgData: this.svgData,
        useText: iconCellText,
        /*{x,y}*/
        mouseData: {
          x: this.mouseData.x,
          y: this.mouseData.y
        }
      }
      /*item:{
        id:Number,
        data:{
         svgData:{title,desc,path},
         mouseData:{x,y}
       }
      }*/
      let item = {
        id: key,//组件唯一标识符 int
        data: value//组件的svg信息及鼠标信息  {svgData,mouseData}
      }
      /*将svg节点加入svgNodes中*/
      this.$set(this.svgNodes, key, item)
      // this.svgNodes.splice(this.svgNodes.length, 0, item)
      this.count++
      // console.log(this.svgNodes);

    },
    /*鼠标进入事件*/
    mouseenter(e) {
      let self = e.target
      self.style.cursor = 'pointer'//设置手型指针
    },
    /*鼠标拖动*/
    mousedown(e, item) {
      let self = e.target
      self.style.cursor = 'move'//设置手型指针
      document.onmousemove = event => {
        this.$set(item.data.mouseData, 'x', event.offsetX - config.svg.width / 2)
        this.$set(item.data.mouseData, 'y', event.offsetY - config.svg.width / 2)
        // this.emit("iconCellMove", {x: event.offsetX, y: event.offsetY})
      }
      document.onmouseup = () => {
        self.style.cursor = 'pointer'
        document.onmousemove = null//鼠标抬起时将拖动事件取消
      }
    },
    /*鼠标移动事件*/
    mousemove(e) {
      // console.log(e);
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY
    },
    /*右击菜单栏 发出了全局信号:cellCheck 携带数据{e,item}*/
    contextmenu(e, item) {
      // eslint-disable-next-line no-undef
      globalEvent.$emit('cellCheck', {e, item})
    },
    /*画板被单击*/
    divClick() {
      // eslint-disable-next-line no-undef
      globalEvent.$emit('drawBoardClicked', true)
    },
    /*svg元素被单击 发送svgCellClicked事件 接收方为AttributeEditor组件*/
    svgCellClicked(e,cellItem){
      // eslint-disable-next-line no-undef
      globalEvent.$emit('svgCellClicked',{e,'item':cellItem})
    },
    /*TODO: svg组件之间使用Line元素连接*/
    svgLink(e,item){
      console.log(e);
      console.log(item);

    }
  },
  /*绑定事件  Event:deleteCell
  * 发送信号  reName 至 AttributeEditor created中
  * 发送信号  deleteSvg 至 AttributeEditor created*/
  created() {
    let self = this
    // eslint-disable-next-line no-undef
    globalEvent.$on('contextMenuClick', data => {
      console.log(data.menuItem);
      switch (data.menuItem.code) {
        case 0:
          // eslint-disable-next-line no-undef
          globalEvent.$emit('reName')
          break
        case 1:
          /*通过组件item的id删除svgNodes元素*/
          self.$delete(self.svgNodes, data.svgCellItemId)
          // eslint-disable-next-line no-undef
          globalEvent.$emit('deleteSvg')
          break
      }

    })
  },
  computed: {
    svgHeight() {
      return config.svg.height
    },
    svgWidth() {
      return config.svg.width
    }
  }
}
</script>

<style scoped>

.board {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>