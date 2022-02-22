<template lang="pug">
.tasks
  h4 Список задач
  div(v-if='tasks.length') 
    table
      thead
        th Название
        th Описание
        th Дедлайн
        th Статус
      tbody
        tr(v-for="(task, idx) in tasks" :key="task.id")
          td {{task.title}}
          td.task-description {{task.description}}
          td {{new Date(task.date).toLocaleDateString()}}
          td {{task.status}}
          td 
            router-link.secondary-content(to="/")
              i.material-icons send
  p(v-else) Список задач пуст
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    }
  }
}
</script>

<style lang="scss" scoped> 
  .task-description {
    max-width: 600px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
  }
  
</style>