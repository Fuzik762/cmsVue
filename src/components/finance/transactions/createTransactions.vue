<template lang='pug'>
#modaltransactions.modal(ref='modaltransactions')
  .modal-content
    form.form-create-account(@submit.prevent='submitCreateTransactions')
      h4 Новый {{type}}
      .input-field
        input#description.validate(
          v-model="description" 
          type='text' 
          required
          :class="{invalid: v$.description.$dirty && v$.description.required}"
          )
        label(for='description') Описание
        span.helper-text.red-text(
              v-if="v$.description.$dirty && !v$.description.required"
            ) Добавьте описание 
      .input-field
        input#amount.validate(
          v-model.number="amount" 
          type='text' 
          required
          :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid}"
          )
        label(for='amount') Сумма  
        span.helper-text.red-text(
              v-if="v$.amount.$dirty && v$.amount.minValue.$invalid"
            ) Минимальная сумма {{v$.amount.minValue.$params.min}}
      button.btn.light-blue.darken-4(type='submit') Добавить {{type}}
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import {required, minValue} from '@vuelidate/validators'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      v$: useVuelidate(),
      description: '',
      amount: 1,
      redirectTab: 'Счета',
      modal: null,
    }
  },
  props: {
    type: null,
    accountId: null,
  },
  validations() {
    return {
      description: {required},
      amount: {required, minValue: minValue(1)}
    }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modaltransactions, {

    })
    M.updateTextFields()
  },
  computed: {
    ...mapGetters(['info']),
    checkBalance() {
      if(this.type === 'Доход') {
        return true
      }

      return this.info.balance >= this.amount
    }
  },
  methods: {
    async submitCreateTransactions() {
      if(this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      if(this.checkBalance) {
        try {
          const transaction = {
            description: this.description,
            amount: this.amount,
            type: this.type,
            date: new Date().toJSON(),
            statusColor: this.type === 'Доход' ? 'green' : 'red',
          }
          this.$store.dispatch('createTransaction', { accountId: this.accountId, transaction })
          const balance = this.type === 'Доход'
            ? this.info.balance + this.amount
            : this.info.balance - this.amount
          this.$store.dispatch('updateBalance', {
            balance,
            type: this.type, 
            amount: this.amount, 
            accountId:this.accountId
            })
          this.$store.commit('clearTransactions')
          await this.$store.dispatch('getTransactions', this.accountId)
          this.$message('Операция успешно выполнена')
          this.modal.close()
        } catch (error) {}

        
      } else {
        this.$message(`Недостаточно средств на счёте (${this.amount - this.info.balance})`)
      }
      
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