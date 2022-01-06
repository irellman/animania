<template>
  <div class="auth">
    <el-scrollbar height="100vh" ref="scroll">
      <div class="auth__form">
        <h1 class="auth__title">Авторизация</h1>
        <input class="auth__input" type="email" placeholder="Электронный адрес" v-model="email" />
        <input class="auth__input" type="password" placeholder="Пароль" v-model="password" />
        <div class="auth__button" @click="submit">Войти</div>
        <router-link class="auth__underbutton" to="/forgot">Забыли пароль?</router-link>
        <div class="auth__footer">Нет аккаунта? <router-link to="/signup">Зарегистрироваться</router-link></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Auth',

  inject: ['user'],

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    submit() {
      let userData = new FormData()
      userData.append('email', this.email)
      userData.append('password', this.password)

      axios.post('http://127.0.0.1:8000/user/login', userData).then((data) => {
        switch(data.data) {
          case 'Требуется подтверждение почты!':
            console.log('Требуется подтверждение почты!')
            break
          case 'Неверная почта или пароль!':
            console.log('Неверная почта или пароль!')
            break
          case 'Пользователь успешно вошёл!':
            this.$router.push('/home')
            this.$emit('login')
            break
        }
      })
    },
    resend() {
      axios.post('http://127.0.0.1:8000/email/resend').then(() => {
        console.log('Success!')
      })
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Auth.scss" scoped />