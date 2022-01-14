<template>
  <div class="media" v-if="media">
    <MediaPoster :poster="media.poster" :banner="media.banner" />
    <div class="content">
      <div class="content__wrapper">
        <MediaData :media="media" v-if="media" />
        <MediaVideos :videos="media.videos" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaPoster from '@/components/MediaPage/MediaPoster'
import MediaVideos from '@/components/MediaPage/MediaVideos/MediaVideos'
import MediaData from '@/components/MediaPage/MediaData/MediaData'

import { getOneMedia } from '@/api/media'

export default {
  name: 'MediaPage',

  components: {
    MediaPoster,
    MediaVideos,
    MediaData
  },

  data() {
    return {
      media: undefined,
    }
  },

  created() {
    getOneMedia(this.$route.params.slug).then(data => {
      this.media = data.data
    })
  }
}
</script>

<style lang="scss" src="@/styles/MediaPage/MediaPage.scss" scoped />