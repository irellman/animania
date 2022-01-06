<template>
	<router-link :to="`/anime/${data.slug}`" class="media-card">
		<div class="cover">
			<img class="cover__image cover__image_loaded" :src="data.poster" />
		</div>
		<div class="title">
			<div class="list-status" :status="data.userStatus" v-if="data.userStatus" />
			{{ data.title }}
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'CatalogMedia',
	props: ['data']
}
</script>

<style lang="scss" src="@/styles/Catalog/CatalogMedia.scss" scoped />