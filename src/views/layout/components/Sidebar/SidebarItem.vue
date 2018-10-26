<template>
  <div class="menu-wrapper">
    <template v-for="item in routes"
              v-if="!item.hidden&&item.children">
      <el-menu-item :index="item.path+'/'+item.children[0].path"
                    v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
                    :key="item.children[0].name"
                    :class="{'submenu-title-noDropdown':!isNest}">
        <i v-if="item.children[0].meta&&item.children[0].meta.icon"
           class="iconfont"
           :class="item.children[0].meta.icon"></i>
        <span v-if="item.children[0].meta&&item.children[0].meta.title"
              slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
      </el-menu-item>
      <el-submenu v-else
                  :index="item.name||item.path"
                  :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon"
             class="iconfont"
             :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title"
                slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children"
                  v-if="!child.hidden">
          <sidebar-item :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :routes="[child]"
                        :key="child.path"></sidebar-item>
          <el-menu-item v-else
                        :key="child.name"
                        :index="item.path+'/'+child.path">
            <i v-if="child.meta&&child.meta.icon"
               :icon-class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title"
                  slot="title">{{generateTitle(child.meta.title)}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren (children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>
