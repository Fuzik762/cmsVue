<template lang="pug">
nav.nav-extended.light-blue.darken-4.task-tabs
  .nav-content
    ul.tabs.tabs-transparent
      li.tab(v-for="tab in tabs" :key="tab" @click='selectTab = tab')
        a {{tab}}
.action-task
  <createTask v-show='selectTab === "Создать"' />
  <listTask v-show='selectTab === "Список"' />
</template>

<script>
import createTask from '@/components/createTask.vue'
import listTask from '@/components/listTask.vue'


export default {
  components: {createTask, listTask},
  data() {
    return {
      tabs: ['Создать', 'Список'],
      selectTab: 'Создать',
    }
  },
}
</script>

<style lang="scss">
  .task-tabs { 
    width: 30%;
  }
  .action-task {
    width: 100%;
    margin-top: 50px;
  }
</style>