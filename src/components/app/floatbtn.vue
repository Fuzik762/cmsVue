<template lang="pug">
<createAccount />
.fixed-action-btn(ref='floatbtn')
    a.btn-floating.btn-large.light-blue.darken-4
      i.large.material-icons add
    ul
      li 
        a.btn-floating.red.modal-trigger(href="#modalaccount" title='Создать счёт')
          i.material-icons account_balance_wallet
      li
        router-link.btn-floating.red(to="/tasks" title='Создать задачу')
          i.material-icons library_add
</template>

<script>
import createAccount from '@/components/finance/createAccount.vue'

export default {
  components: {createAccount},
  data() {
    return {
      floatBtn: null,
    }
  },
  mounted() {
    this.floatBtn = M.FloatingActionButton.init(this.$refs.floatbtn, {

    })
  },
  beforeDestroy() {
    if(this.floatbtn && this.floatbtn.destroy) {
      this.floatbtn.destroy()
    }
  },
}
</script>