<template lang="pug">
nav.nav-extended.light-blue.darken-4.task-tabs
  .nav-content
    ul.tabs.tabs-transparent
      li.tab(v-for="tab in tabs" :key="tab" @click='selectTab = tab')
        a {{tab}}
.action-task
  
</template>

<script>


export default {
  components: {},
  data() {
    return {
      tabs: ['Cчета', 'Транзакции'],
      selectTab: 'Счета',
    }
  },
  methods: {
    // showTask(id){
    //   this.selectTab = 'Изменить'
    //   this.taskId = id
    // }
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