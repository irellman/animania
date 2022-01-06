<template>
  <div class="auth">
    <div class="auth__form">
      <h1 class="auth__title">Смена пароля</h1>
      <input class="auth__input" type="password" placeholder="Новый пароль" v-model="password" />
      <input class="auth__input" type="password" placeholder="Повторите новый пароль" v-model="password_confirmation" />
      <div class="auth__button" @click="submit">Сменить пароль</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PasswordReset',

  data() {
    return {
      password: '',
      password_confirmation: '',
    }
  },

  methods: {
    submit() {
      if (this.password !== this.password_confirmation) {
        console.log('Пароли не совпадают!')
        return
      }

      let data = new FormData(),
          url = new URLSearchParams(window.location.search.slice(1))

      data.append('token', this.$route.params.token)
      data.append('email', url.get('email'))
      data.append('password', this.password)
      data.append('password_confirmation', this.password_confirmation)

      axios.post('http://127.0.0.1:8000/password/reset', data).then(() => {
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Auth.scss" scoped />