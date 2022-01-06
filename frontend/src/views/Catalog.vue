<template>
  <div class="catalog">
    <div class="container">
      <CatalogFilter @update="applyChanges" />
      <div class="results">
        <CatalogMedia :data="item" v-for="item in mediaData" :key="item.id" @click="openCard(item.slug)" />
      </div>
    </div>
  </div>
</template>

<script>
import CatalogFilter from '@/components/Catalog/CatalogFilter'
import CatalogMedia from '@/components/Catalog/CatalogMedia'
import { getMediaPage } from '@/api/media'

export default {
  name: 'AnimeCatalog',

  components: {
    CatalogFilter,
    CatalogMedia
  },

  data() {
    return {      
      mediaData: [],
    }
  },

  mounted() {
    this.getMedia({sort: 'По популярности'})
  },

  methods: {
    applyChanges(filters) {
      this.mediaData = []
      console.log(filters)
      this.getMedia(filters)
    },
    openCard(slug) {
      this.$emit('openMedia', slug)
    },
    getMedia(filters) {
      getMediaPage(filters).then((data) => {
        this.mediaData.push(...data.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-filters {
  margin-left: auto;
  margin-top: 10px;
}

.secondary-filters {
  align-items: center;
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 30px;
  min-height: 33px;
  position: relative;
}

.results {
  display: grid;
  grid-gap: 25px 20px;
  grid-template-columns: repeat(auto-fill,185px);
  justify-content: space-between;
}

@media (max-width: 1540px) {
  .results {
    grid-gap: 25px 20px;
  }
}

@media (max-width: 1065px) {
  .results {
    grid-gap: 25px 14px;
  }
}

@media(max-width: 1040px) {
  .results {
    grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
    grid-gap: 25px 20px;
    justify-content: center;
  }
}

@media(max-width: 760px) {
  .results {
    grid-template-columns: repeat(auto-fill,minmax(105px,1fr));
    grid-gap: 25px;
  }
}

@media(max-width: 500px) {
  .results {
    margin-top: 72px;
  }
}

@media(max-width: 400px) {
  .results {
    grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
    grid-gap: 20px 12px;
  }
}
</style>