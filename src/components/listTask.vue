<template lang="pug">
.tasks
  ul.collection.with-header
    li.collection-header
      h4 Список задач
    li.collection-item(v-for="(task, idx) in tasks" :key="task.id")
      div {{task.title}}
        router-link.secondary-content(to="`${task.id}`")
          i.material-icons send
 
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: new Date(), title: 'Тестовая задача', description: 'Тестовое описание'},
        { id: new Date(), title: 'Тестовая задача', description: 'Тестовое описание'},
        { id: new Date(), title: 'Тестовая задача', description: 'Тестовое описание'},
      ]
    }
  },
}
</script>