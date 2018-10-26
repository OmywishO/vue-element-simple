<template>
  <el-dropdown trigger="click"
               class='international'
               @command="handleSetLanguage">
    <div class="international-icon">
      {{$t('navbar.language')}}
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh"
                        :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en"
                        :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language () {
      return this.$store.getters.getLanguage
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$store.dispatch('setLanguage', lang)
    }
  }
}
</script>

<style scoped>
.international-icon {
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>
