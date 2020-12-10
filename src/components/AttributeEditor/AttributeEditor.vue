<template>
  <el-menu :default-openeds="['1','2']">
    <el-submenu index="1">
      <template slot="title">
        基本属性
      </template>
      <el-menu-item-group index="1-1">
          <el-form class="attribute-editor-form"
                   label-width="5em"
                   label-position="right"
                   ref="form">
            <el-form-item label="标签名：">
              <el-input :disabled="inputStatus.inputTitle.disable"
                        ref="inputTitle"
                        v-model="svgItem.data.svgData.title"></el-input>
            </el-form-item>
          </el-form>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        坐标信息
      </template>
      <el-menu-item-group index="2-1">
        <el-form class="attribute-editor-form"
                 label-width="5em"
                 label-position="right"
                 ref="form">
          <el-form-item label="x：">
            <el-input :disabled="inputStatus.mouse.inputX.disable"
                      ref="inputMouseInputX"
                      v-model="svgItem.data.mouseData.x"></el-input>
          </el-form-item>
          <el-form-item label="y：">
            <el-input :disabled="inputStatus.mouse.inputY.disable"
                      ref="inputMouseInputY"
                      v-model="svgItem.data.mouseData.y"></el-input>
          </el-form-item>
        </el-form>
      </el-menu-item-group>

    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "AttributeEditor",
  props:{
    svgItem:{
      type:Object,
      required:false,
      default(){
        return {
          id:undefined,
          data:{
            mouseData:{
              x:'null',
              y:'null'
            },
            svgData:{
              desc:'null',
              path:'null',
              svgId:'',
              title:'未选择'
            }
          }
        }
      }
    }
  },
  data(){
    return{
      inputs:{
        inputTitle:undefined,
        inputMouseInputX:undefined,
        inputMouseInputY:undefined
      },
      inputStatus:{
        inputTitle:{
          disable:true,
          status:'blur'
        },
        mouse:{
          inputX:{
            disable:true,
            status:'blur'
          },
          inputY:{
            disable:true,
            status:'blur'
          }
        }

      },

    }
  },
  created() {
    let self = this
    // eslint-disable-next-line no-undef
    globalEvent.$on('svgCellClicked',data=>{
      this.$set(this.svgItem,'data',data.item.data)//设置鼠标信息
      this.inputStatus.inputTitle.disable = false
      this.inputStatus.mouse.inputX.disable = false
      this.inputStatus.mouse.inputY.disable = false
      // this.$set(this.svgItem.data,'svgData',data.item.data.svgData)
    })
    // eslint-disable-next-line no-undef
    globalEvent.$on('reName',()=>{
      self.inputs.inputTitle = self.$refs['inputTitle']
      self.inputs.inputTitle.focus()

    })

    // eslint-disable-next-line no-undef
    globalEvent.$on('deleteSvg',(t)=>{
      console.log(t);
      t.eventState = 'deleteSvg'
      self.inputs.inputTitle = self.$refs['inputTitle']
      self.inputs.inputMouseInputX = self.$refs['inputX']
      self.inputs.inputMouseInputY = self.$refs['inputY']
      self.inputStatus.inputTitle.disable = true
      self.inputStatus.mouse.inputX.disable = true
      self.inputStatus.mouse.inputY.disable = true
    })
  }
}
</script>

<style scoped>
.attribute-editor-form{

  border:2px solid rgb(255,255,255);
  border-radius: 2px;
}
.attribute-editor-title{
  position: relative;
  line-height: 50px;
  text-align: center;
}
</style>