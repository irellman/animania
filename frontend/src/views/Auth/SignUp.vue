<template>
  <div class="auth">
    <el-scrollbar height="100vh">
    <div class="auth__form">
      <h1 class="auth__title">Регистрация</h1>
      <input class="auth__input" type="text" placeholder="Имя пользователя" v-model="username" />
      <input class="auth__input" type="email" placeholder="Электронный адрес" v-model="email" />
      <input class="auth__input" type="password" placeholder="Пароль" v-model="password" />
      <input class="auth__input" type="password" placeholder="Повторите пароль" v-model="currentPassword" />
      <div class="auth__button" @click="submit">Зарегистрироваться</div>
      <div class="auth__footer">Уже есть аккаунт? <router-link to="/login">Авторизоваться</router-link></div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',

  inject: ['user'],

  data() {
    return {
      username: '',
      email: '',
      password: '',
      currentPassword: ''
    }
  },

  methods: {
    submit() {
      if (this.password !== this.currentPassword) {
        console.log('Пароли не совпадают!')
        return
      }

      let userData = new FormData()
      userData.append('name', this.username)
      userData.append('email', this.email)
      userData.append('password', this.password)
      userData.append('password_confirmation', this.currentPassword)

      axios.post('http://127.0.0.1:8000/register', userData).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Auth.scss" scoped />