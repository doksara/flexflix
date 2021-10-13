<template>
  <div class="home">
    <p>eee</p>
    <TvShowCard :tvshow="singleTvShow" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { singleTvShow } from "@/mocks"
import TvShowCard from "@/components/TvShowCard.vue"

export default defineComponent({
  name: "Home",
  
  components: {
    TvShowCard
  },
  
  setup() {

    return {
      singleTvShow
    }
  }
});
</script>

<style lang="scss" scoped>
.home {
  padding: 2rem;
}
</style>
