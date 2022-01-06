<template>
  <header class="header">
    <div class="header__wrap" v-if="width.value > 500">
      <router-link to="/home" class="logo" :style="{'background-image': `url('../img/logo.png')`}" />
      <div class="links">
        <router-link class="links__link" to="/home">Главная</router-link>
        <router-link class="links__link" to="/catalog">Каталог</router-link>
      </div>
      <div class="header-list">
        <div class="header-list__item search">
          <fa :icon="['fas', 'search']" size="lg" />
        </div>
        <div class="header-list__item planning">
          <fa :icon="['far', 'bookmark']" size="lg" />
        </div>
        <div class="header-list__item user" :class="{'user_active': modal_is_active}" @click.stop="OpenModal()">
          <img class="user__avatar" src='https://s4.anilist.co/file/anilistcdn/user/avatar/large/b872722-jCvwfQqyVOor.png' />
        </div>
      </div>
    </div>
    <div class="header__wrap" v-else>
      <router-link to="/home" class="header__button"><fa icon="home" size="sm" /><div class="header__text">Главная</div></router-link>
      <router-link to="/catalog" class="header__button"><fa icon="search" size="sm" /><div class="header__text">Каталог</div></router-link>
      <router-link to="/planning" class="header__button"><fa icon="bookmark" size="sm" /><div class="header__text">Закладки</div></router-link>
      <router-link to="/profile" class="header__button"><fa icon="user" size="sm" /><div class="header__text">Аккаунт</div></router-link>
    </div>
    <div class="modal" :class="{'modal_active': modal_is_active}">
      <div class="modal__content">
        <div class="modal-user">
          <div class="modal-user__avatar" :style="{'background-image': 'url(https://s4.anilist.co/file/anilistcdn/user/avatar/large/b872722-jCvwfQqyVOor.png)'}" />
          <div class="modal-user__username">Rahlmann</div>
        </div>
        <div class="modal-list">
          <div class="modal-list__option"><fa class="modal-list__icon" icon="user" />Мой аккаунт</div>
          <div class="modal-list__option"><fa class="modal-list__icon" icon="bookmark" />Смотреть позже</div>
          <div class="modal-list__option"><fa class="modal-list__icon" icon="list" />Мои списки</div>
        </div>
        <div class="modal-list">
          <div class="modal-list__option"><fa class="modal-list__icon" icon="sign-out-alt" />Выйти</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  inject: ['width'],

  props: ['user'],

  data() {
    return {
      modal_is_active: false
    }
  },

  methods: {
    logout() {
      this.$emit('logout')
    },
    CloseModal(event) {
      if (!event.target.closest('.modal__content')) {
        document.body.classList.remove('scroll-off')
        this.modal_is_active = false
      }
    },
    OpenModal() {
      this.modal_is_active = true
      document.body.classList.add('scroll-off')
      document.addEventListener('click', this.CloseModal)
    }
  }
}
</script>

<style lang="scss" src="@/styles/Main/Header.scss" scoped />