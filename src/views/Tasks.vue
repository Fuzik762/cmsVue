<template lang="pug">
nav.nav-extended.light-blue.darken-4.task-tabs
  .nav-content
    ul.tabs.tabs-transparent
      li.tab(v-for="tab in tabs" :key="tab" @click='selectTab = tab')
        a {{tab}}
.action-task
  <createTask v-if='selectTab === "Создать"' @showList="this.selectTab = $event" />
  <listTask v-if='selectTab === "Список"' @getTaskId="showTask($event)" />
  <editTask v-if='selectTab === "Изменить"' @showList="this.selectTab = $event" :id='this.taskId' />
</template>

<script>
import createTask from '@/components/createTask.vue'
import listTask from '@/components/listTask.vue'
import editTask from '@/components/editTask.vue'

export default {
  components: {createTask, listTask, editTask},
  data() {
    return {
      tabs: ['Создать', 'Список', 'Изменить'],
      selectTab: 'Создать',
      taskId: null,
    }
  },
  methods: {
    showTask(id){
      this.selectTab = 'Изменить'
      this.taskId = id
    }
  },
}
</script>

<style lang="scss">
  .task-tabs { 
    width: 30%;
    position: fixed;
    z-index: 3;
  }
  .action-task {
    width: 100%;
    margin-top: 100px;
  }
</style>