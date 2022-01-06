<template>
  <Header :user="user" @logout="logout" v-if="user" />
  <div class='page'>
    <router-view @login="getUser" />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import { computed } from 'vue'

export default {
  name: 'App',

  provide() {
    return {
      user: this.user,
      width: computed(() => this.width)
    }
  },

  data() {
    return {
      windowWidth: document.body.clientWidth,
      user: localStorage.getItem('user') || 'guest',
    } 
  },

  computed: {
    width() {
      return this.windowWidth
    }
  },

  components: {
    Header
  },

  mounted() {
    this.getUser()

    window.addEventListener('resize', () => {
      this.windowWidth = document.body.clientWidth
    })
  },

  methods: {
    logout() {
      axios.post('/logout').then(() => {
        this.user = 'guest'
        localStorage.setItem('user', 'guest')
        this.$router.push('/home')
      })
    },
    getUser() {
      axios.post('/auth').then(data => {
        if (data.data === 'email must be verified!') {
          this.user = 'guest'
          localStorage.setItem('user', 'guest')
        } else {
          if (!Object.keys(data.data).length) {
            this.user = 'guest'
            localStorage.setItem('user', 'guest')
          } else {
            this.user = data.data
            localStorage.setItem('user', JSON.stringify(data.data))
          }
        }
      }).catch(() => {
        this.user = 'guest'
        localStorage.setItem('user', 'guest')
      })
    }
  }
}
</script>

<style lang="scss">
:root {
  --header-background: 30, 30, 30;

  --primary-color: 0, 0, 0;
  --primary-color-hover: 20, 20, 20;
  --primary-text: 255, 255, 255;

  --secondary-color: 244, 117, 33;
  --secondary-color-hover: 255, 148, 77;
}

* {
  box-sizing: border-box;
}

:after, :before {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  background: rgb(var(--primary-color));
  color: rgb(var(--primary-text));
  font-family: Roboto;
  font-size: 16px;
  height: 100%;
  margin: 0;
  overflow-x: hidden;

  &.scroll-off {
    overflow: hidden;
  }
}

a {
  color: inherit;
  text-decoration: none;
  transition: .15s;
  outline: 0;
}

#app {
  height: 100vh;
}

.page {
  margin-top: 60px;

  @media(max-width: 500px) {
    margin: 0;
  }
}

.container {
  margin: 0 auto;
  min-width: 320px;
  width: 80vw;
  padding: 10px 0;

  @media(min-width: 1540px) {
    & {
      max-width: 1520px;
      padding-left: 100px;
      padding-right: 100px;
    }
  }

  @media(min-width: 1024px) and (max-width: 1540px) {
    & {
      width: 100vw;
      padding-left: 50px;
      padding-right: 50px;
    }
  }

  @media(max-width: 1024px) {
    & {
      width: 100vw;
      padding: 10px;
    }
  }
}
</style>
