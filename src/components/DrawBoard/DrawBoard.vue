<template ref="DrawBoard">
  <div @click="divClick">
    <svg id="draw_board"
         class="board"
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
  </div>

</template>

<script>
import config from "@/icons/config";
// import ContextMenu from "@/components/ContextMenu/ContextMenu";

export default {
  name: "DrawBoard",
  components: {
    // ContextMenu
  },
  data() {
    return {
      el: undefined,
      addChilden:false,//用于实现只执行一次的加入symbol节点的功能
      mouseCursor: '',
      mouse: {
        x: 0,
        y: 0
      },
      eventState: 0,//事件状态  当svg-use 的g层被单击 eventState将由link => pointer 但首先会获取到link
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
      svgLinks: []//连线节点
    }
  },
  watch: {
    svgNodes() {
      // console.log(this.svgNodes);
    },
    eventState(newVal, ordVal) {
      console.log(ordVal + ' => ' + newVal);
    }
  },
  methods: {
    /*接收拖放元素的事件 svgNodes在此处更新键值对 当组件第一次被拖拽，则将symbol节点拷贝到draw_board的svg中
    * 关于移动symbol节点 尝试过使用svg-sprite-loader官方提供的修改配置文件的方法，但使用后发现如果渲染指定id的节点元素，
    *   会因为vue与svg-sprite-loader渲染顺序的关系，svg-sprite-loader先渲染，则找不到对应组件id，获取不到元素，
    *   若vue先渲染id = app ，再用svg-sprite-loader渲染指定组件id，则将id = app的元素替换成了symbol内容，没有追加。
    *   之后又尝试在draw-board组件中的mounted()事件中渲染，发现还是没有找到节点，查了vue文档后发现原因是
    *   mounted不会保证所有的子组件也都一起被挂载。官方建议是在mounted中使用vm.$nextTick，
    *   但我还没有尝试，还是决定用原生的方法：在元素被第一次拖拽时，将symbol节点的拷贝加入svg的子节点中，然后删除symbol节点。
    * */
    dropHandle(e) {
      if(!this.addChilden){
        let symbol = document.getElementById('__SVG_SPRITE_NODE__')//找到symbol节点
        let draw_board = document.getElementById('draw_board')//找到自身
        draw_board.appendChild(symbol.cloneNode(true))//将symbol的深拷贝加入到画板节点中
        symbol.remove()//将symbol节点移除
        this.addChilden = true
      }

      /*  DrawBoard.vue?c315:14 {"path":"3","title":"图标三","desc":"描述文本"}*/
      this.svgData = JSON.parse(e.dataTransfer.getData('text/plain'))//拖放成功则将该信息赋值给svgData
      /*将鼠标信息存入mouseData*/
      this.mouseData.x = e.offsetX - config.svg.width / 2;
      this.mouseData.y = e.offsetY - config.svg.height / 2;
      /*定义键值对*/
      let key = this.count
      /*{svgData:{title,desc,path},mouseData:{x,y}}*/

      let value = {
        /*{title,desc,path}*/
        svgData: this.svgData,
        /*{x,y}*/
        mouseData: {
          x: this.mouseData.x,
          y: this.mouseData.y
        }
      }
      let nodeItem = {
        /*自身数据集只需具备一个*/
        selfData: {
          id: key,
          x: 0,
          y: 0
        },
        /*对于连接的其他元素，应该使用一个Array存储*/
        nextNodes: [
          // {id:0,x:0,y:0}
        ]
      }
      /*item:{id:Number,data:{svgData:{title,desc,path},mouseData:{x,y}}}*/
      let item = {
        id: key,//组件唯一标识符 int
        data: value,//组件的svg信息及鼠标信息  {svgData,mouseData}
        nodes: nodeItem//组件的节点信息
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
        let x = event.offsetX - config.svg.width / 2
        let y = event.offsetY - config.svg.width / 2
        this.$set(item.data.mouseData, 'x', x)
        this.$set(item.data.mouseData, 'y', y)
        this.$set(item.nodes.selfData, 'x', x)//设置自身的selfData中x的值
        this.$set(item.nodes.selfData, 'y', y)//设置自身的selfData中y的值
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
      /*右击菜单栏 */
      this.components.ContextMenu.show({e,item})
    },
    /*画板被单击*/
    divClick() {
      this.eventState = 'pointer'//画板被单击则变回普通状态
      this.components.ContextMenu.hiddenContextMenu(true)//如果画板被单击，则不显示ContextMenu组件
    },
    /*svg元素被单击 发送svgCellClicked事件 接收方为AttributeEditor组件*/
    svgCellClicked(e, cellItem) {
      this.components.AttributeEditor.getSvgMsg({e, 'item': cellItem})
    },
    contextMenuClick(data){
      let self = this
      this.components.ContextMenu.hiddenContextMenu(true)
      switch (data.menuItem.code) {
        case 0:
          self.eventState = 'link'
          break
        case 1:
          self.eventState = 'reName'
          this.components.AttributeEditor.reName()
          break
        case 2:
          self.eventState = 'deleteSvg'
          /*通过组件item的id删除svgNodes元素*/
          self.$delete(self.svgNodes, data.svgCellItemId)
          this.components.AttributeEditor.deleteSvg(self)
          break
        default:
          self.eventState = 'pointer'
          break
      }
    },
    /*TODO: svg组件之间使用Line元素连接*/
    svgLink(e, item) {
      // {item:{id,data,nodes}}


      console.log(e);
      console.log(item);

    },

  },
  /*绑定事件  Event:deleteCell
  * 发送信号  reName 至 AttributeEditor created中
  * 发送信号  deleteSvg 至 AttributeEditor created*/
  created() {
    this.$set(this.components,'DrawBoard',this)
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