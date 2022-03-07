<template lang="pug">
h4 Список Транзакции 
  span(v-if='account') по счёту {{account.title}}
    <CreateTransactions :type='this.type' :accountId='this.account.id'/>
    .row
      button.btn.small-button.green.modal-trigger(data-target="modaltransactions" @click='this.type = "Доход"') Новый доход
      button.btn.small-button.red.modal-trigger(data-target="modaltransactions" @click='this.type = "Расход"') Новый расход
div(v-if='loading') Загрузка...

div.list(v-else-if='transactions.length')
  table
    thead
      th Название
      th.center Тип транзакции
      th.center Сумма
      th.center Дата
    tbody
      tr(v-for="(transaction, idx) in transactions")
        td {{transaction.description}}
        td.center {{transaction.type}}
        td.center(:class = "transaction.statusColor") {{transaction.amount}}
        td.center {{new Date(transaction.date).toLocaleDateString()}}
p(v-else) Список Транзакции пуст

</template>

<script>
import CreateTransactions from '@/components/finance/transactions/createTransactions.vue'
export default {
  data() {
    return {
      loading: false,
      type: 'Расход',
    }
  },
  components: {CreateTransactions},
  props: {
    account: '',
  },
  async created() {
    if(!Object.keys(this.$store.getters.transactions).length) {
      await this.$store.dispatch('getTransactions', this.account.id)
      this.loading = false
    } else {
      this.$store.commit('clearTransactions')
      await this.$store.dispatch('getTransactions', this.account.id)
      this.loading = false
    }
  },
  computed: {
    transactions() {
      return this.$store.getters.transactions
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    max-width: 60%;
  }
  .row {
    width: 20%;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  .center {
    text-align: center;
  }
</style>