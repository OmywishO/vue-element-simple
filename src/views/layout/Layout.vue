<template>
  <el-container style="height:100%;">
    <el-header height='50px'>
      <Navbar></Navbar>
    </el-header>
    <el-container>
      <el-aside width='200px'>
        <Sidebar></Sidebar>
      </el-aside>
      <RootView></RootView>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, RootView } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    RootView
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
