<template>
  <div class="home">
    <p>eee</p>
    <TvShowCard :tvshow="singleTvShow" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { singleTvShow } from "@/mocks";
import TvShowCard from "@/components/TvShowCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    TvShowCard
  },
  setup() {
    fetch('https://localhost:44341/api/tvshow/')
      .then(response => response.json())
      .then(data => console.log(data))

    return {
      singleTvShow
    }
  }
});
</script>
