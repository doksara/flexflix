<template>
  <article class="c-tvshowcard">
    <div class="c-tvshowcard__image-container">
      <img class="c-tvshowcard__image" :src="tvshow.image" :alt="tvshow.name">
    </div>
    <div class="c-tvshowcard__info">
      <p class="c-tvshowcard__rating">
        <star theme="filled" class="c-tvshowcard__rating-star" />
        <span class="c-tvshowcard__rating-number">{{ tvshow.rating }}</span>
      </p>
      <span class="c-tvshowcard__seasoncount">{{ tvshow.seasonCount }}</span>
      <h3 class="c-tvshowcard__title">{{ tvshow.name }}</h3>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TvShow } from '@/interfaces'
import { Star } from '@icon-park/vue-next'

export default defineComponent({
  components: {
    Star
  },

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
  width: 12rem;
  height: 20rem;
  border-radius: 8px;
  padding: 4px;

  &__image {
    display: block;
    width: 100%;

    &-container {
      overflow: hidden;
      max-height: 14rem;
      border-radius: 8px;
    }
  }

  &__rating {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--yellow-vivid-600);

    &-star {
      color: var(--yellow-vivid-400);
    }

    &-number {
      color: var(--cool-grey-050);
      margin-left: 4px;
    }
  }
}
</style>