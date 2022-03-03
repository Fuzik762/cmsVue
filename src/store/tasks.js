export default {
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if(new Date(task.date) < new Date()) {
        task.status = 'Провалена'
        task.statusColor = 'red'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date}) {
      const tasks = state.tasks.concat()

      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]

      const status = new Date(date) > new Date() ? 'Выполняется' : 'Провалена'
      tasks[idx] = {...task, date, description, status}

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }, 
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)

      state.tasks[idx].status = 'Выполнена'
      state.tasks[idx].statusColor = 'green'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  modules: {
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
}