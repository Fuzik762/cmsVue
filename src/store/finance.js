import firebase from "firebase/app"
import { uuid } from 'vue-uuid'

export default {
  state: {
    accounts: [],
    transactions: [],
  },
  mutations: {
    setAccounts(state, accounts) {
      state.accounts = accounts
    },
    clearAccounts(state) {
      state.accounts = []
    },
    setTransactions(state, transactions) {
      state.transactions = transactions
    },
    clearTransactions(state) {
      state.transactions = []
    },
  },
  actions: {
    async createAccount({dispatch, commit}, account) {
      try {
        const uid = await dispatch('getUserId')
        account.id = uuid.v4()
        await firebase.database().ref(`/users/${uid}/accounts/${account.id}`).set(account)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getAccounts({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        const accounts = (await firebase.database().ref(`/users/${uid}/accounts`).once('value')).toJSON()
        commit('setAccounts', accounts === null ? [] : Object.values(accounts))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getAccountBalance({dispatch, commit}, accountId) {
      try {
        const uid = await dispatch('getUserId')
        const balance = (await firebase.database().ref(`/users/${uid}/accounts/${accountId}`).once('value')).toJSON().balance
        return balance
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateBalance({dispatch, commit, getters}, update) {
      try {
        const uid = await dispatch('getUserId')
        const updateInfo = {...getters.info}
        updateInfo.balance = update.balance
        console.log(updateInfo)
        let accountBalance = await dispatch('getAccountBalance', update.accountId)
        await firebase.database().ref(`/users/${uid}/info`).update(updateInfo)
        accountBalance = update.type === 'Доход'
          ? accountBalance + update.amount
          : accountBalance - update.amount
        await firebase.database().ref(`/users/${uid}/accounts/${update.accountId}`).update({
          balance: accountBalance, 
        })
        commit('setInfo', updateInfo)
      } catch (error) {
        commit('setError', error)
        throw error
      }
      
    },
    async createTransaction({dispatch, commit}, create) {
      try {
        const uid = await dispatch('getUserId')
        create.transaction.id = uuid.v4()
        await firebase.database().ref(`/users/${uid}/accounts/${create.accountId}/transactions/${create.transaction.id}`).set(create.transaction)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getTransactions({dispatch, commit}, accountId) {
      try {
        const uid = await dispatch('getUserId')
        const transactions = (await firebase.database().ref(`/users/${uid}/accounts/${accountId}/transactions`).once('value')).toJSON()
        commit('setTransactions', transactions === null ? [] : Object.values(transactions))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    accounts: s => s.accounts,
    transactions: s => s.transactions,
  } 

}