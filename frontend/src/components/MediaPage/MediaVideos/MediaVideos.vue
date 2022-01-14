<template>
	<div class="watch">
		<div class="arc" v-for="arc of arc_list" :key="arc">
			<h2 class="arc__tttle">{{ arc }}</h2>
			<div class="episode-list">
				<div class="episode" v-for="video of videos" :key="video.title">
					<div class="episode__poster" :style="{'background-image': `url(${video.preview})`}">
					<div class="episode__duration">{{ video.duration }} мин.</div>
					</div>
					<div class="episode__title">#{{ video.number }} - {{ video.title }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MediaVideos',
	props: ['videos'],

	computed: {
		arc_list() {
			let arc_list = []
			for (let video of this.videos) {
        if (arc_list.indexOf(video.season) === -1) {
          arc_list.push(video.season)
        }
      }
			return arc_list
		}
	}
}
</script>

<style lang="scss" src="./MediaVideos.scss" scoped />