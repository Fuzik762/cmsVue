<template lang='pug'>
#modalaccount.modal(ref='modalaccount')
  .modal-content
    form.form-create-account(@submit.prevent='submitCreateAccount')
      h4 Новый счёт
      .input-field
        input#titleaccount.validate(v-model="title" type='text' required)
        label(for='titleaccount') Название счёта   
      button.btn.modal-close.light-blue.darken-4(type='submit') Создать счёт
</template>

<script>
export default {
  data() {
    return {
      title: '',
      redirectTab: 'Счета',
      modal: null,
    }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modalaccount, {

    })
  },
  methods: {
    async submitCreateAccount() {
      const account = {
        title: this.title,
        balance: 0,
        statusColor: 'green',
      }
      try {
        await this.$store.dispatch('createAccount', account)
        this.$store.commit('clearAccounts')
        await this.$store.dispatch('getAccounts')
         this.$message('Операция успешно выполнена')
      } catch (error) {}
    }
  },
  destroyed() {
    if(this.modal && this.modal.destroy()) {
      this.modal.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
  .modal {
    max-width: 25%
  }
  .form-create-task {
    max-width: 70%;
  }
  .btn { 
    margin-top: 20px;
  }
</style>