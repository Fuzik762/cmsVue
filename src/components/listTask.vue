<template lang="pug">
.tasks
  .row(v-show='tasks.length')
    .input-field.col.s3
      select(ref='filterTask' v-model="filter")
        option(value='' disabled selected) Выберите статус задачи
        option(value='Выполняется') Выполняется
        option(value='Выполнена') Выполнена
        option(value='Провалена') Провалена
      label Фильтр задач
      a.btn-small.red.darken-1(v-if='filter' @click='filter = null')  Очистить фильтр
        i.material-icons.left block
        
  h4 Список задач
  div(v-if='loading') Тест

  div(v-else)
    div(v-if='tasks.length') 
      table
        thead
          th Название
          th Описание
          th Дедлайн
          th.task-status Статус
        tbody
          tr(v-for="(task, idx) in displayTasks")
            td {{task.title}}
            td.task-description {{task.description}}
            td {{new Date(task.date).toLocaleDateString()}}
            td.task-status(:class = "task.statusColor") {{task.status}}
            td 
              a.secondary-content(@click.pevent='taskId(task.id)')
                i.material-icons.blue-text send
    p(v-else) Список задач пуст
</template>

<script>
export default {
  data() {
    return {
      filter: null,
      loading: true,
    }
  },
  async mounted() {
    M.FormSelect.init(this.$refs.filterTask, {

    })
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if(!this.filter) {
          return true
        }
        return t.status === this.filter
      })
    }
  },
  methods: {
    taskId(id) {
      this.$emit('getTaskId', id)
    },
  },
  async created() {
    if(!Object.keys(this.$store.getters.tasks).length) {
      await this.$store.dispatch('getTasks')
      this.loading = false
    } else {
      this.$store.commit('clearTasks')
      await this.$store.dispatch('getTasks')
      this.loading = false 
    }
  },
}
</script>

<style lang="scss" scoped> 
  .secondary-content {
    cursor: pointer;
  }
  .task-description {
    max-width: 600px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
  }
  .task-status {
    text-align: center;
  }
  
</style>