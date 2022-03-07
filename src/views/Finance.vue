<template lang="pug">
nav.nav-extended.light-blue.darken-4.finance-tabs
  .nav-content
    ul.tabs.tabs-transparent
      li.tab(v-for="tab in tabs" :key="tab" @click='selectTab = tab')
        a {{tab}}
.action-finance
  <ListAccounts v-if='selectTab === "Счета"' @getTransactionsList='showTransactions($event)'/>
  <CreateAccount />
  <ListTransactions v-if='selectTab === "Транзакции"' :account='this.account'/>

</template>

<script>
import ListAccounts from '@/components/finance/listAccounts.vue'
import CreateAccount from '@/components/finance/createAccount.vue'
import ListTransactions from '@/components/finance/transactions/listTransactions.vue'

export default {
  components: {ListAccounts, CreateAccount, ListTransactions},
  data() {
    return {
      tabs: ['Счета', 'Транзакции'],
      selectTab: 'Счета',
      account: null,
    }
  },
  mounted() {
    
  },
  methods: {
    showTransactions(account) {
      this.selectTab = 'Транзакции'
      this.account = account
    }
  },
}
</script>

<style lang="scss">
  .finance-tabs { 
    width: 30%;
    position: fixed;
    z-index: 3;
  }
  .action-finance {
    width: 100%;
    margin-top: 100px;
  }
</style>