<template>
  <header class="header">
    <router-link class="link" to="/home"><fa icon="home" /></router-link>
    <router-link class="link" to="/catalog"><fa icon="play" /></router-link>
    <router-link class="link" to="/lists"><fa icon="bookmark" /></router-link>
    <router-link class="link" to="/user"><fa icon="user" /></router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',

  inject: ['width'],

  props: ['user'],

  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Header.scss" scoped />