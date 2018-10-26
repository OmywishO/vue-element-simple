<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">{{$t('permission.roles')}}： {{roles}}</div>
    {{$t('permission.switchRoles')}}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor"></el-radio-button>
    </el-radio-group>
    <div>
      <h1>模块信息</h1>
      <el-select v-model="selRoter"
                 placeholder="请选择">
        <el-option v-for="(item, index) in asynRouter"
                   :key="index"
                   :label="generateTitle(item.meta.title)"
                   :value="index">
        </el-option>
      </el-select>
      <el-button>新建</el-button>
      <el-button>修改</el-button>
      <h1>页面信息</h1>
      <div>
        <el-select v-model="selPage"
                   placeholder="请选择">
          <el-option v-for="(item, index) in asynRouter[selRoter].children"
                     :key="index"
                     :label="generateTitle(item.meta.title || '无')"
                     :value="index">
          </el-option>
        </el-select>
        <el-button>添加</el-button>
        <el-button>修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'

export default{
  name: 'permission',
  data () {
    return {
      switchRoles: '',
      selRoter: 0,
      selPage: 0,
      asynRouter: ''
    }
  },
  created () {
    this.asynRouter = JSON.parse(localStorage.getItem('asyncRouter'))
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    generateTitle
  },
  watch: {
    switchRoles (val) {
      this.$store.dispatch('ChangeRoles', val).then(() => {
        this.$router.push({ path: '/permission/index?' + +new Date() })
      })
    }
  }
}
</script>
