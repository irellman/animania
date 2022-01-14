<template>
  <div class="data">
		<div class="header">
			<div class="title">{{ media?.title }}</div>
		</div>
		<div class="actions">
			<div class="rating">
				<div class="rating__stars">
					<fa class="rating__star" :class="{'rating__star_hover': hover_stars >= number}" :icon="[hover_stars >= number ? 'fas' : 'far', 'star']" @mouseover="hover_stars = number" @mouseout="hover_stars = selected_star" @click="StarSelected(number)" v-for="number of 5" :key="number" />
				</div>
				<div class="rating__stats">
					Средняя оценка: <span class="rating__score" @click.stop="OpenDropdown">{{ media?.score }}</span> ({{ popularity }})
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
			<router-link :to="`/catalog?genre=${genre.slug}`" class="genres__genre" v-for="genre in media?.genres" :key="genre">{{ genre.name }}</router-link>
		</div>
	</div>
</template>

<script>
import MediaStatDropdown from '@/components/MediaPage/MediaStatDropdown/MediaStatDropdown'

export default {
	name: 'MediaData',
	props: ['media'],

	components: {
		MediaStatDropdown
	},

	inject: ['width'],

	data() {
		return {
			selected_star: 5,
      hover_stars: 5,
      StatDropdownActive: false
		}
	},

	computed: {
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

<style lang="scss" src="./MediaData.scss" scoped />