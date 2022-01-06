<template>
  <div class="auth">
    <div class="auth__form">
      <h1 class="auth__title">Восстановление пароля</h1>
      <input class="auth__input" type="email" placeholder="Электронный адрес" v-model="email" />
      <div class="auth__button" @click="submit">Восстановить пароль</div>
      <div class="auth__footer"><router-link to="/login">Войти</router-link></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Forgot',

  data() {
    return {
      email: ''
    }
  },

  methods: {
    submit() {
      let formData = new FormData()
      formData.append('email', this.email)
      axios.post('http://127.0.0.1:8000/password/email', formData)
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Auth.scss" scoped />