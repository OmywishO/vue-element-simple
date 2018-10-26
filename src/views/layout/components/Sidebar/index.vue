<template>
  <scroll-bar>
    <el-menu mode="vertical"
             :show-timeout="200"
             :default-active="$route.path"
             :collapse="isCollapse"
             :router='true'>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    ...mapState([
      'routers'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  created () {
    // console.log(this.permission_routers)
  }
}
</script>
