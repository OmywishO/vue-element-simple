<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button>测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style module lang="postcss">
h1 {
  font-size: 15px;
}
</style>
