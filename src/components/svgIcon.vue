<template>
  <svg :height="size.h" :width="size.w" :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
import config from "@/icons/config";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    size:{//图标大小 默认为32*32
      type:Object,
      default(){
        return{
          w:config.svg.width,
          h:config.svg.height
        }
      }
    },
    context:{
      type:String,
      required: false
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
  }
}
</script>

<style scoped>
.svg-icon {
  margin: 3px;
  width: 2em;
  height: 2em;
  /*position: absolute;*/
}
</style>
