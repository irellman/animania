<template>
  <div class="dropdown" :class="{'dropdown_active': isActive}">
    <div class="dropdown__title">Статистика оценок</div>
    <div class="dropdown__list">
      <div class="option">
        <div class="option__score">5 <fa icon="star" /></div>
        <div class="option__bar">
          <div class="option__bar-fill" :style="{'width': StatsData[0]}" />
        </div>
        <div class="option__value">{{ stats.score_5 }}</div>
      </div>
      <div class="option">
        <div class="option__score">4 <fa icon="star" /></div>
        <div class="option__bar">
          <div class="option__bar-fill" :style="{'width': StatsData[1]}" />
        </div>
        <div class="option__value">{{ stats.score_4 }}</div>
      </div>
      <div class="option">
        <div class="option__score">3 <fa icon="star" /></div>
        <div class="option__bar">
          <div class="option__bar-fill" :style="{'width': StatsData[2]}" />
        </div>
        <div class="option__value">{{ stats.score_3 }}</div>
      </div>
      <div class="option">
        <div class="option__score">2 <fa icon="star" /></div>
        <div class="option__bar">
          <div class="option__bar-fill" :style="{'width': StatsData[3]}" />
        </div>
        <div class="option__value">{{ stats.score_2 }}</div>
      </div>
      <div class="option">
        <div class="option__score">1 <fa icon="star" /></div>
        <div class="option__bar">
          <div class="option__bar-fill" :style="{'width': StatsData[4]}" />
        </div>
        <div class="option__value">{{ stats.score_1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaStatDropdown',

  props: {
    stats: {
      type: Object,
      default() {
        return {
          score_5: 0,
          score_4: 0,
          score_3: 0,
          score_2: 0,
          score_1: 0
        }
      }
    },
    popularity: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isActive(value) {
      if (value === true) {
        document.addEventListener('click', this.CloseModal)
      }
    }
  },

  computed: {
    StatsData() {
      console.log(this.stats)
      if (!this.stats) {
        return [0, 0, 0, 0, 0]
      }

      return [
        `${this.stats.score_5 / this.popularity * 100}%`,
        `${this.stats.score_4 / this.popularity * 100}%`,
        `${this.stats.score_3 / this.popularity * 100}%`,
        `${this.stats.score_2 / this.popularity * 100}%`,
        `${this.stats.score_1 / this.popularity * 100}%`
      ]
    }
  },

  methods: {
    CloseModal(event) {
      if (!event.target.closest('.dropdown')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" src="./MediaStatDropdown.scss" scoped />