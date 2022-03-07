import firebase from "firebase/app"
import { uuid } from 'vue-uuid'

export default {
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    clearTasks(state) {
      state.tasks = []
    },
  },
  actions: {
    async createTask({dispatch, commit}, task) {
      try {
        const uid = await dispatch('getUserId')
        task.id = uuid.v4()
        await firebase.database().ref(`/users/${uid}/tasks/${task.id}`).set(task)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getTasks({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        const tasks = (await firebase.database().ref(`/users/${uid}/tasks`).once('value')).toJSON()
        commit('setTasks', tasks === null ? [] : Object.values(tasks))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateTask({dispatch}, {id, description, date}) {
      try {
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/tasks/${id}`).update({
          description,
          date,
          status: new Date(date) > new Date() ? 'Выполняется' : 'Провалена',
          statusColor: new Date(date) > new Date() ? 'cyan' : 'red'
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async completeTask({dispatch}, id) {
      try {
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/tasks/${id}`).update({
          status: 'Выполнена',
          statusColor: 'green'
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
}