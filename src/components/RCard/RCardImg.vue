<script setup lang="ts">
import { useAttrs } from 'vue'
import RImg from '../RImg/index.vue'
import type { ImgProps } from '@/types'

// const RImg = defineAsyncComponent(() => import('@/components/RImg/index.vue'))

const cardImgProps = withDefaults(defineProps<ImgProps>(), {
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
