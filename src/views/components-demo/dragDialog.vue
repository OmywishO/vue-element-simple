<template>
  <div class="components-container">
    <el-button type="primary"
               @click="dialogTableVisible = true">open a Drag Dialog</el-button>
    <div>
      <div class="form-group form-group-lg panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Sortable control</h3>
        </div>
        <div class="panel-body">
          <div class="checkbox">
            <label><input type="checkbox"
                     v-model="editable">Enable drag and drop</label>
          </div>
          <button type="button"
                  class="btn btn-default"
                  @click="orderList">Sort by original order</button>
          <div>
            样式：<input type="text"
                   @change="styleChange"
                   v-model="styleObj">
          </div>
        </div>
      </div>

      <div style="clear:both;">
        <div class="col-md-3">
          <draggable class="list-group"
                     element="ul"
                     v-model="list"
                     :options="dragOptions"
                     :move="onMove"
                     @start="isDragging=true"
                     @end="isDragging=false">
            <transition-group type="transition"
                              :name="'flip-list'">
              <li class="list-group-item"
                  v-for="element in list"
                  :key="element.order">
                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                   @click=" element.fixed=! element.fixed"
                   aria-hidden="true"></i>
                {{element.name}}
                <span class="badge">{{element.order}}</span>
              </li>
            </transition-group>
          </draggable>
        </div>

        <div class="col-md-3">
          <draggable element="span"
                     v-model="list2"
                     :options="dragOptions"
                     :move="onMove">
            <transition-group name="no"
                              class="list-group"
                              tag="ul">
              <li :class="{'is-active':index==isActive, 'list-group-item': true} "
                  v-for="(element, index) in list2"
                  @click="selectEle(element, index)"
                  :key="element.order">
                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                   @click=" element.fixed=! element.fixed"
                   aria-hidden="true"></i>
                {{element.name}}
                <span class="badge"
                      :style="element.style">{{element.order}}</span>
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div style="clear:both;">
        <div class="list-group col-md-3">
          <pre>{{listString}}</pre>
        </div>
        <div class="list-group col-md-3">
          <pre>{{list2String}}</pre>
        </div>
      </div>
    </div>
    <el-dialog v-el-drag-dialog
               title="Shipping address"
               :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date"
                         label="Date"
                         width="150"></el-table-column>
        <el-table-column property="name"
                         label="Name"
                         width="200"></el-table-column>
        <el-table-column property="address"
                         label="Address"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import draggable from 'vuedraggable'
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]

export default {
  name: 'dragDialog-demo',
  directives: { elDragDialog },
  components: {
    draggable
  },
  data () {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false, style: '' }
      }),
      list2: [],
      styleObj: '',
      isActive: '',
      editable: true,
      isDragging: false,
      delayedDragging: false,
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  methods: {
    orderList () {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order
      })
    },
    styleChange () {
      console.log(`{${this.styleObj}}`)
      console.log(this.list2[this.isActive])
      this.list2[this.isActive].style = JSON.parse(`{${this.styleObj}}`)
    },
    selectEle (ele, index) {
      this.isActive = index
      this.styleObj = ''
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    listString () {
      return JSON.stringify(this.list, null, 2)
    },
    list2String () {
      return JSON.stringify(this.list2, null, 2)
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return false
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  }
}
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.col-md-3 {
  width: 45%;
  float: left;
  padding: 10px;
  margin: 10px;
  border: 1px solid #dddddd;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item.is-active {
  background-color: #c8ebfb;
}
.list-group-item i {
  cursor: pointer;
}
</style>
