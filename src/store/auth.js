import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async register({dispatch, commit}, {email, password, firstName, lastName}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          firstName,
          lastName,
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async logout() {
      await firebase.auth().signOut()
    },
    async getUserId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}