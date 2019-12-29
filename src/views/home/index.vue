<template>
  <el-container>
    <el-aside :style="{width:collapses?'60px':'230px'}" style='min-height:100vh;background-color: #323745;overflow:hidden;'>
      <layout-aside :collapses="collapses"></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapses: false
    }
  },
  methods: {

  },
  created () {
    eventBus.$on('collapses', () => {
      this.collapses = !this.collapses
    })
  }
}
</script>

<style>

</style>
