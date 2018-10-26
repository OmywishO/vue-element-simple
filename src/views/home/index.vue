<template>
  <div>
    <div class="hello">
      <h1 style="text-align: center;"><i class="iconfont icon-zhuti"></i>拖动到指定div</h1>
      <template>
        <div class='drag-content'>
          <div class='project-content'>
            <div class='select-item'
                 draggable='true'
                 @dragstart='drag($event)'
                 :key="index"
                 v-for='(pjdt,index) in projectdatas'>{{pjdt.name}}</div>
          </div>
          <div class='people-content'>
            <div class='drag-div'
                 :key="ppdt"
                 v-for='(ppindex,ppdt) in peopledata'
                 @drop='drop($event)'
                 @dragover='allowDrop($event)'>
              <div class='select-project-item'>
                <label class='drag-people-label'>{{ppindex.name}}：</label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
let dom = ''
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tags: [{
        id: 1,
        name: '第一个'
      },
      {
        id: 2,
        name: '第二个'
      }],
      projectdatas: [{
        id: 1,
        name: '葡萄'
      },
      {
        id: 2,
        name: '芒果'
      },
      {
        id: 3,
        name: '木瓜'
      },
      {
        id: 4,
        name: '榴莲'
      }],
      peopledata: [{
        id: 1,
        name: 'first'
      },
      {
        id: 2,
        name: 'second'
      }, {
        id: 3,
        name: 'third '
      },
      {
        id: 3,
        name: 'four'
      }]
    }
  },
  methods: {
    getdata (evt) {
      console.log(evt.draggedContext.element.id)
    },
    datadragEnd (evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.tags)
    },
    drag (event) {
      dom = event.currentTarget
    },
    drop (event) {
      event.preventDefault()
      console.log('我是target')
      console.log(event.srcElement.className)
      if (event.srcElement.className !== 'select-item') {
        event.target.appendChild(dom)
        console.log(dom)
      } else {
        alert('该位置已被占用')
      }
    },
    allowDrop (event) {
      event.preventDefault() // preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
    },
    checkMove (evt) {
      console.log(111111111111111111111)
      console.log(evt.draggedContext.element.name)
      alert(1)
      return (evt.draggedContext.element.name !== 'apple')
    }
  },
  components: {draggable}
}
</script>
<style scoped>
.select-item {
  background-color: var(--color);
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
  padding: 6px 20px;
  color: #fff;
}
.cursored {
  cursor: default;
}
.project-content,
.people-content {
  margin: 30px 50px;
}
.people-content {
  margin-top: 30px;
}
.drag-div {
  border: 1px solid #5bc0de;
  padding: 10px;
  margin-bottom: 10px;
  width: 800px;
  cursor: pointer;
}
.select-project-item {
  display: inline-block;
  text-align: center;
  border-radius: 3px;
}
.drag-people-label {
  margin-bottom: 0;
  padding-right: 10px;
}
</style>
