<template>
  <article class="c-tvshowcard">
    <div class="c-tvshowcard__image-container">
      <img class="c-tvshowcard__image" :src="tvshow.image" :alt="tvshow.name">
    </div>
    <div class="c-tvshowcard__info">
      <p class="c-tvshowcard__rating">{{ tvshow.rating }}</p>
      <span class="c-tvshowcard__seasoncount">{{ tvshow.seasonCount }}</span>
      <h3 class="c-tvshowcard__title">{{ tvshow.name }}</h3>
    </div>
  </article>
</template>

<script lang="ts">
import { TvShow } from '@/interfaces'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tvshow: {
      type: Object as () => TvShow,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.c-tvshowcard {
  background-color: #22252f;

  &__image {
    display: block;
    width: 100%;

    &-container {
      display: inline-flex;
      max-width: 8rem;
    }
  }
}
</style>