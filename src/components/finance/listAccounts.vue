<template lang="pug">
h4 Список счетов 
button.btn.small-button.green.modal-trigger(data-target="modalaccount") Создать счёт
div(v-if='loading') Загрузка...

div.list(v-else-if='accounts.length')
  table
    thead
      th Название
      th.account-status Баланс
    tbody
      tr(v-for="(account, idx) in accounts")
        td {{account.title}}
        td.account-status(:class = "account.statusColor") {{account.balance}}
        td 
          a.secondary-content(@click.pevent='accountName(account)')
            i.material-icons.blue-text send
p(v-else) Список счетов пуст
</template>

<script>
export default {
  emits: ["getTransactionsList"],
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    accountName(account) {
      this.$emit('getTransactionsList', account)
    }
  },
  async created() {
    if(!Object.keys(this.$store.getters.accounts).length) {
      await this.$store.dispatch('getAccounts')
      this.loading = false
    } else {
      this.$store.commit('clearAccounts')
      await this.$store.dispatch('getAccounts')
      this.loading = false
    }
  },
  computed: {
    accounts() {
      return this.$store.getters.accounts
    }
  }
}
</script>

<style lang="scss" scoped>
  .secondary-content {
    cursor: pointer;
  }
  .list {
    max-width: 40%;
  }
  .account-status {
    text-align: center;
  }
</style>