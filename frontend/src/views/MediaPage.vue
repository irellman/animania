<template>
  <div class="media" v-if="media">
    <div class="banner" v-if="width.value > 320">
      <div class="background" :style="{'background-image': `url(${poster})`}"></div>
      <div class="poster" :style="{'background-image': `url(${poster})`}" />
    </div>
    <div class="poster" :style="{'background-image': `url(${poster})`}" v-else />
    <div class="content">
      <div class="content__wrapper">
        <div class="data">
          <div class="data__block">
            <div class="header">
              <div class="title">{{ media?.title }}</div>
            </div>
            <div class="actions">
              <div class="rating">
                <div class="rating__stars">
                  <fa class="rating__star" :class="{'rating__star_hover': hover_stars >= 1}" :icon="[hover_stars >= 1 ? 'fas' : 'far', 'star']" @mouseover="hover_stars = 1" @mouseout="hover_stars = selected_star" @click="StarSelected(1)" />
                  <fa class="rating__star" :class="{'rating__star_hover': hover_stars >= 2}" :icon="[hover_stars >= 2 ? 'fas' : 'far', 'star']" @mouseover="hover_stars = 2" @mouseout="hover_stars = selected_star" @click="StarSelected(2)" />
                  <fa class="rating__star" :class="{'rating__star_hover': hover_stars >= 3}" :icon="[hover_stars >= 3 ? 'fas' : 'far', 'star']" @mouseover="hover_stars = 3" @mouseout="hover_stars = selected_star" @click="StarSelected(3)" />
                  <fa class="rating__star" :class="{'rating__star_hover': hover_stars >= 4}" :icon="[hover_stars >= 4 ? 'fas' : 'far', 'star']" @mouseover="hover_stars = 4" @mouseout="hover_stars = selected_star" @click="StarSelected(4)" />
                  <fa class="rating__star" :class="{'rating__star_hover': hover_stars >= 5}" :icon="[hover_stars >= 5 ? 'fas' : 'far', 'star']" @mouseover="hover_stars = 5" @mouseout="hover_stars = selected_star" @click="StarSelected(5)" />
                </div>
                <div class="rating__stats">
                  Средняя оценка: <span class="rating__score" @click.stop="OpenDropdown">{{ media?.score }}</span> ({{ this.popularity }})
                  <MediaStatDropdown :stats="media?.stats" :popularity="media?.popularity" :isActive="StatDropdownActive" @close="StatDropdownActive = false" />
                </div>
              </div>
              <div class="actions__buttons">
                <div class="actions__button actions__button_watch" v-if="width.value <= 748">Начать смотреть</div>
                <div class="actions__button actions__button_bookmark" @click="WatchLater()"><fa class="actions__icon" :icon="['far', 'bookmark']" /><span v-if="width.value > 425">Смотреть позже</span></div>
                <div class="actions__button actions__button_list-button" @click="AddToList()"><fa class="actions__icon_list-button" icon="plus" />Добавить в список</div>
              </div>
            </div>
            <div class="description">{{ media?.description }}</div>
            <div class="genres">
              <router-link :to="`/catalog/${genre.slug}`" class="genres__genre" v-for="genre in media?.genres" :key="genre">{{ genre.name }}</router-link>
            </div>
          </div>
          <div class="data__block" v-if="width.value > 748">
            <div class="preview">
              <div class="episode" v-if="media.videos">
                <div class="episode__poster" :style="{'background-image': `url(${media?.videos[0].preview})`, 'height': '180px'}">
                  <div class="episode__duration">{{ media?.videos[0].duration }} мин.</div>
                </div>
              </div>
              <div class="preview__button">Начать смотреть</div>
            </div>
          </div>
        </div>
        <div class="watch">
          <div class="arc"></div>
          <div class="episode-list">
            <div class="episode" v-for="video of media?.videos" :key="video.title">
              <div class="episode__poster" :style="{'background-image': `url(${video.preview})`}">
                <div class="episode__duration">{{ video.duration }} мин.</div>
              </div>
              <div class="episode__title">#{{ video.number }} - {{ video.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaStatDropdown from '@/components/MediaPage/MediaStatDropdown'

import { getOneMedia } from '@/api/media'

export default {
  name: 'MediaPage',

  components: {
    MediaStatDropdown
  },

  inject: ['width'],

  data() {
    return {
      media: undefined,
      arc_list: [],
      selected_star: 5,
      hover_stars: 5,
      StatDropdownActive: false
    }
  },

  computed: {
    poster() {
      return this.width.value < 800 ? this.media.poster : this.media.banner
    },
    popularity() {
      if(!this.media.popularity) {
        return 0
      }

      let popularity = '',
          media_popularity = this.media.popularity.toString()

      for (let i = media_popularity.length; i > 0; i--) {
        if (i % 3 === 0 && i !== media_popularity.length) {
          popularity += ','
          popularity += media_popularity.split('')[media_popularity.length - i]
        } else {
          popularity += media_popularity.split('')[media_popularity.length - i]
        }
      }
      
      return popularity
    }
  },

  created() {
    getOneMedia(this.$route.params.slug).then(data => {
      this.media = data.data

      for (let video of data.data) {
        if (this.arc_list.indexOf(video.season) === -1) {
          this.arc_list.push(video.season)
        }
      }
    })
  },

  methods: {
    OpenDropdown() {
      this.StatDropdownActive = this.StatDropdownActive ? false : true
    },
    WatchLater() {
      console.log('watch later!')
    },
    AddToList() {
      console.log('add to list!')
    },
    StarSelected(star) {
      this.selected_star = star
      console.log(`star selected: ${star}`)
    }
  }
}
</script>

<style lang="scss" src="@/styles/MediaPage/MediaPage.scss" scoped />