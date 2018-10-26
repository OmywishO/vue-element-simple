<template>
  <div class="login">
    <img src="@/assets/logo.png">
    <el-form :model="ruleForm2"
             status-icon
             :rules="rules2"
             ref="ruleForm2"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="账号"
                    prop="account">
        <el-input v-model="ruleForm2.account"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm2.pass"
                  autoComplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-disButton
                   @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  removeToken
} from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      setTimeout(() => {
        if (!value) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 100) {
            callback(new Error('账号至少三位字符'))
          } else {
            callback()
          }
        }
      }, 10)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        account: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    removeToken()
    this.getThemeColor('primaryColor')
  },
  methods: {
    getThemeColor (id) {
      const color = this.$store.getters.getTheme
      let styleTag = document.getElementById(id)
      let newStyle = `:root {
        --color: ${color};
      }`
      // console.log(color, styleTag, id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.ruleForm2).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  width: 30%;
  margin: 0 auto;
  text-align: center;
  img {
    margin-right: -100px;
  }
}
</style>
