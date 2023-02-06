<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'
import RImg from '../RImg/index.vue';

// const RImg = defineAsyncComponent(() => import('@/components/RImg/index.vue'))

type CardImgAttrs = {
  src?: string
  alt?: string
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  preload?: boolean
  loading?: 'lazy'
  lazy?: boolean
  image?: boolean
  class?: HTMLAttributes['class']
  fluid?: boolean
  thumbnail?: boolean
  height?: string | number
  width?: string | number
  start?: boolean
  end?: boolean
  center?: boolean
  sizes?: string
}

const cardImgProps = withDefaults(defineProps<CardImgAttrs>(), {
  image: true,
  lazy: true,
  fluid: false,
  thumbnail: false,
  center: false,
  start: false,
  end: false
})

const $cardImgAttrs = useAttrs()

const cardImgAttrs = {
  src: cardImgProps.src,
  alt: cardImgProps.alt,
  fit: cardImgProps.fit,
  preload: cardImgProps.preload,
  loading: cardImgProps.loading,
  lazy: cardImgProps.lazy,
  class: [cardImgProps.class, 'card-img-top'],
  fluid: cardImgProps.fluid,
  thumbnail: cardImgProps.thumbnail,
  height: cardImgProps.height,
  width: cardImgProps.width,
  start: cardImgProps.start,
  end: cardImgProps.end,
  center: cardImgProps.center,
  sizes: cardImgProps.sizes,
  ...$cardImgAttrs
}
</script>

<template>
  <RImg v-if="!!cardImgProps.src" v-bind="cardImgAttrs" />
</template>
