<template>
  <article class="c-tvshowcard">
    <div class="c-tvshowcard__image-container">
      <img class="c-tvshowcard__image" :src="tvshow.image" :alt="tvshow.name">
    </div>
    <div class="c-tvshowcard__info">
      <p class="c-tvshowcard__rating">
        <star theme="filled" class="c-tvshowcard__rating-star" />
        <span class="c-tvshowcard__rating-number">{{ tvshow.rating.toFixed(1) }}</span>
      </p>
      <span class="c-tvshowcard__seasoncount">{{ tvshow.seasonCount }} seasons</span>
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
  border: 1px solid rgba(48, 50, 65, .75);
  padding: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &__image {
    display: block;
    width: 100%;

    &-container {
      overflow: hidden;
      max-height: 14rem;
      border-radius: 8px;
    }
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    margin: 8px;
  }

  &__seasoncount {
    flex: 1;
    text-align: left;
    margin-left: 8px;
    font-weight: 500;
    opacity: .85;
  }

  &__title {
    width: 100%;
    text-align: left;
    margin-top: 4px;
    font-weight: 600;
    font-size: 1.125rem;
  }

  &__rating {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--yellow-vivid-600);
    border-radius: 4px;
    background: rgba(255, 255, 255, .15);
    line-height: 1;
    padding: 2px 3px;

    &-star {
      display: inline-flex;
      align-items: center;
      color: var(--yellow-vivid-400);
    }

    &-number {
      margin-left: 4px;
      font-weight: 500;
    }
  }
}
</style>