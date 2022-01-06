<template>
  <div class="filter">
    <div class="search">
      <fa class="search__icon" icon="search" />
      <input
        class="search__input"
        type="text"
        :value="filters.search"
        @input="changeFilter($event.target.value, 'search')"
      />
    </div>
    <div class="options-btn" @click="openDropdown">
      <fa icon="sliders-h" :class="{ active: listActive }" />
    </div>
    <div class="options" :class="{ options_visible: listActive }">
      <div class="options__filters">
        <div class="options__title">Жанры</div>
        <div class="options-group options-group_genres">
          <div
            class="option option_with-image"
            :class="{'option_active': filters.genres.indexOf(genre.name) > -1}"
            v-for="genre in genres"
            :key="genre.name"
            @click="changeFilter(genre.name, 'genre')"
          >
            <div class="option__image" :style="{'background-image': `url(${genre.image})`}" />
            <div class="option__name">{{ genre.name }}</div>
          </div>
        </div>
        <div class="options__title">Сортировать по</div>
        <div class="options-group">
          <div
            class="option"
            :class="{'option_active': filters.sort === item}"
            v-for="item in sorts"
            :key="item"
            @click="changeFilter(item, 'sort')"
          >
            <div class="option__name">{{ item }}</div>
          </div>
        </div>
        <div class="options__title">Статус выхода</div>
        <div class="options-group">
          <div
            class="option"
            :class="{'option_active': filters.status === item}"
            v-for="item in statuses"
            :key="item"
            @click="changeFilter(item, 'status')"
          >
            <div class="option__name">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="options__footer">
        <div class="options__button" v-if="width.value <= 500" @click="listActive = false">Обновить Фильтры</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGenres } from '@/api/genres.js'

export default {
  name: 'CatalogFilter',

  inject: ['width'],

  data() {
    return {
      listActive: false,
      timeout: undefined,

      statuses: ['Выходит', 'Завершен'],
      sorts: ['По алфавиту', 'По популярности', 'По кол-ву серий'],
      genres: [],

      filters: {
        search: '',
        status: '',
        genres: [],
        sort: 'По популярности'
      }
    }
  },

  watch: {
    filters: {
      deep: true,
      handler() {
        this.timeout = setTimeout(() => {
          this.$emit('update', this.filters)
        }, 300)
      }
    }
  },

  mounted() {
    getGenres().then(data => this.genres = [...data.data])
  },

  methods: {
    changeFilter(value, type) {
      clearTimeout(this.timeout)
      switch (type) {
        case 'search':
          this.filters.search = value.trim()
          break
        case 'sort':
          this.filters.sort = value
          break
        case 'genre':
          if (this.filters.genres.indexOf(value) > -1) {
            this.filters.genres = this.filters.genres.filter(genre => {return genre !== value})
          } else {
            this.filters.genres.push(value)
          }
          break
        case 'status':
          if (this.filters.status === value) {
            this.filters.status = ''
          } else {
            this.filters.status = value
          }
          break
      }
    },
    openDropdown() {
      if (this.listActive === true) {
        this.listActive = false
      } else {
        this.listActive = true
      }

      document.addEventListener('click', this.closeList)
    },
    closeList(event) {
      if (!event.target.closest('.options-btn') && !event.target.closest('.options')) {
        this.listActive = false
        document.removeEventListener('click', this.closeList)
      }
    }
  }
}
</script>

<style lang="scss" src="@/styles/Catalog/CatalogFilter.scss" scoped />
