<template>
	<div class="banner" v-if="width.value > 320">
		<div class="background" :style="{'background-image': `url(${MediaPoster})`}"></div>
		<div class="poster" :style="{'background-image': `url(${MediaPoster})`}" />
	</div>
	<div class="poster" :style="{'background-image': `url(${MediaPoster})`}" v-else />
</template>

<script>
export default {
	name: 'MediaPoster',

	props: ['poster', 'banner'],
	inject: ['width'],

	computed: {
		MediaPoster() {
      return this.width.value < 800 ? this.poster : this.banner
    }
	}
}
</script>

<style lang="scss" src="./styles.scss" scoped />