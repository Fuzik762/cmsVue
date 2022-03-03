<template lang="pug">
.container
    .container-wrapper
      .row
        form.col.s12(@submit.prevent='onLogin')
          h4 Домашняя система контроля
          .input-field.col.s12
            input#email(
              type='text' 
              required 
              v-model.trim="email"
              :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"
              )
            label(for='email') e-mail
            span.helper-text.red-text(
              v-if="v$.email.$dirty && !v$.email.required"
            ) Поле Email не должно быть пустым
            span.helper-text.red-text(
              v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            ) Email должен быть корректный
          .input-field.col.s12
            input#password(
              type='password' 
              required 
              v-model.trim="password"
              :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"
              )
            label(for='password') Пароль
            span.helper-text.red-text(
              v-if="v$.password.$dirty && v$.password.required.$invalid"
            ) Введите пароль
            span.helper-text.red-text(
              v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
            ) Пароль должен быть не менее {{v$.password.minLength.$params.min}} символов.
          button.btn.blue.darken-4(type='submit') Войти
          h6 Ещё не зарегистрированы? 
            router-link(to="/register")  Зарегистрироваться
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import {required, minLength, email} from '@vuelidate/validators'
import messages from '@/utils/messageList'

export default {
  name: 'login',
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
    }
  },
  validations() {
    return {
      email: {email,required},
      password: {required, minLength: minLength(6)}
    }
  },
  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onLogin() {
      if(this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }
       
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {}

    },
   
  }
}
</script>

<style lang="scss" scoped>
  .container { 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-wrapper {
      background-color: #fff;
      padding: 50px;
    }
  }
  button {
    width: 100%;
    margin-top: 25px;
  }
</style>