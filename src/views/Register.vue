<template lang="pug">
.container
    .container-wrapper
      .row
        form.col.s12(@submit.prevent='onRegister')
          h4 Домашняя система контроля
          .input-field.col.s6
            input#first_name.validate(
              type='text' 
              required
              v-model.trim="firstName"
              :class="{invalid: (v$.firstName.$dirty && v$.firstName.required.$invalid) || (v$.firstName.$dirty && v$.firstName.minLength.$invalid)}"
              )
            label(for='first_name') Имя
            span.helper-text.red-text(
              v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
            ) Поле Имя не должно быть пустым
            span.helper-text.red-text(
              v-else-if="v$.firstName.$dirty && v$.firstName.minLength.$invalid"
            ) Имя должно быть не менее {{v$.firstName.minLength.$params.min}} символов.
          .input-field.col.s6
            input#last_name.validate(
              type='text' 
              required
              v-model.trim="lastName"
              :class="{invalid: (v$.lastName.$dirty && v$.lastName.required.$invalid) || (v$.lastName.$dirty && v$.lastName.minLength.$invalid)}"
              )
            label(for='last_name') Фамилия
            span.helper-text.red-text(
            v-if="v$.lastName.$dirty && v$.lastName.required.$invalid"
            ) Поле Фамилия не должно быть пустым
            span.helper-text.red-text(
              v-else-if="v$.lastName.$dirty && v$.lastName.minLength.$invalid"
            ) Фамилия должно быть не менее {{v$.lastName.minLength.$params.min}} символов.
          .input-field.col.s12
            input#email.validate(
              type='text' 
              required
              v-model.trim="email"
              :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"
              )
            label(for='email') E-mail
            span.helper-text.red-text(
              v-if="v$.email.$dirty && v$.email.required.$invalid"
            ) Поле Email не должно быть пустым
            span.helper-text.red-text(
              v-else-if="v$.email.$dirty && v$.email.email.$invalid"
            ) Email должен быть корректный
          .input-field.col.s12
            input#password.validate(
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
          button.btn.blue.darken-4(type='submit') Зарегистрироваться
          h6 Уже есть аккаунт? 
            router-link(to="/login") Войти
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength, email} from '@vuelidate/validators'

export default {
  data() {
    return {
      v$: useVuelidate(),
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      firstName: {required, minLength: minLength(2)},
      lastName: {required, minLength: minLength(2)},
      email: {email,required},
      password: {required, minLength: minLength(6)}
    }
  },
  methods: {
    async onRegister() {
      if(this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/tasks')
      } catch (error) {}
      
    }
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
      max-width: 70%;
      background-color: #fff;
      padding: 50px;
    }
  }
  button {
    width: 100%;
    margin-top: 25px;
  }
</style>