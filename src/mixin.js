import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      // 添加到全局计算属性中
      getTheme: 'getTheme',
      getLanguage: 'getLanguage'
    })
  },
  directives: {
    // 指令的定义，防止用户多次点击重复请求指令
    disButton: {
      inserted: function (el) {
        function enButton () {
          el.setAttribute('disabled', 'disabled')
          el.classList.add('is-disabled')
          setTimeout(() => {
            el.classList.remove('is-disabled')
            el.removeAttribute('disabled')
          }, 300)
        }
        el.addEventListener('click', enButton, false)
      }
    }
  },
  methods: {
    mixinGoBack () {
      this.$router.go(-1)
    },
    /**
     * url（必填）请求地址  params（可选）参数  message（可选）自定义提示信息
     */
    mixinConfirm (url, params, message) {
      let msg = message || this.$t('views.dialogText.deleteConfirm')
      return this.$confirm(msg, this.$t('views.dialogText.tip')).then(() => {
        return this.$post(url, params).then(data => {
          return new Promise((resolve) => {
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('views.notification.succeed')
              })
              resolve(true)
            }
          })
        })
      }).catch(() => {
        return new Promise((resolve, reject) => {
          resolve(false)
        })
      })
    }
  }
}
