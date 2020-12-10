<template>
  <div id="app">
    <Topo/>
    <context-menu></context-menu>
<!--    <svg-icon icon-class="qq"></svg-icon>-->
  </div>
</template>

<script>

import Topo from "@/components/Topo";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
export default {
  name: 'app',
  components: {
    Topo,ContextMenu
  }
}
</script>

<style>
*{
  font-weight: 300;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
