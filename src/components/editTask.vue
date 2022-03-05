<template lang='pug'>
div(v-if="task")
  form.form-create-task(@submit.prevent='submitEdit')
    h4 Изменение задачи
    h6 {{task.title}}
    .input-field
      textarea#textarea2.materialize-textarea(v-model="description" data-length='2048')
      label(for='textarea2') Описание задачи
      span.character-counter(style='float: right; font-size: 12px;') {{+description.length}}/2048
    input.datepicker(type='text' ref="datepicker")
    div(v-if='task.status !== "Выполнена"')
      button.btn.light-blue.darken-4(type='submit') Изменить задачу
      button.btn.light-green(type='button' @click='completeTask') Завершить задачу
p(v-else) Такой задачи не существует
</template>

<script>
export default {
  data() {
    return {
      description: '',
      date: null,
      redirectTab: 'Список',
    }
  },
  props: {
    id: null,
  },
  computed: {
    task() {
      return this.$store.getters.taskById(this.id)
    }
  },
  mounted() {
    if(this.task) {
      this.description = this.task.description
      this.date = M.Datepicker.init(this.$refs.datepicker, {
        format: 'dd.mm.yyyy',
        defaultDate: new Date(this.task.date),
        setDefaultDate: true
      });
      setTimeout(() => {
        M.updateTextFields()
      }, 0);
    }
  },
  methods: {
    submitEdit() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: Date.parse(this.date.date)
      })
      this.$emit('showList', this.redirectTab)
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$emit('showList', this.redirectTab)
    }
  },
  destroyed() {
    if(this.date && this.date.destroy) {
      this.date.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
  textarea {
    min-height: 200px;
    overflow: scroll;
  }
  .form-create-task {
    max-width: 50%;
    margin-top: 50px;
  }
  .btn { 
    margin-top: 20px;
    margin-right: 50px;
  }
</style>