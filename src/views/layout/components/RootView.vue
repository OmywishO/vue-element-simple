<template>
  <el-scrollbar id='main' class="app-main">
    <transition name="fade"
                mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'RootView',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
