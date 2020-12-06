<template>
  <svg class="board"
       ondragover="return false"
       @drop="dropHandle"
  >
<!--    g标签包裹svg实现定位操作-->
    <g v-for="item in svgNodes"
       :key="item.id"
       :transform="'translate(' + item.data.mouseData.x +',' + item.data.mouseData.y +')'">
      <svg-icon :iconClass="item.data.svgData.path"></svg-icon>
    </g>


  </svg>
</template>

<script>
import config from "@/icons/config";
export default {
  name: "DrawBoard",
  data() {
    return {
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
      svgNodes: []//svg节点 List
    }
  },
  watch: {
    svgNodes() {
      // console.log(this.svgNodes);
    }
  },
  methods: {
    /*接受拖放元素的事件*/
    dropHandle(e) {
      /*  DrawBoard.vue?c315:14 {"path":"3","title":"图标三","desc":"描述文本"}*/
      this.svgData = JSON.parse(e.dataTransfer.getData('text/plain'))//拖放成功则将该信息赋值给svgData
      /*将鼠标信息存入mouseData*/
      this.mouseData.x = e.offsetX - config.svg.width/2;
      this.mouseData.y = e.offsetY - config.svg.height/2;
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
      this.svgNodes.splice(this.svgNodes.length, 0, item)
      this.count++
      console.log(this.svgNodes);

    }
  }
}
</script>

<style scoped>
.board {

  width: 100%;
  height: 100%;
}
</style>