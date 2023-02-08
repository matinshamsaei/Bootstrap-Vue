<script setup lang="ts">
import { useAttrs } from 'vue'
import type { HTMLAttributes } from 'vue'
import RImg from '../RImg/index.vue'

// const RImg = defineAsyncComponent(() => import('@/components/RImg/index.vue'))

type cardImgProps = {
  src: string
  alt?: string
  blank?: boolean
  class?: HTMLAttributes['class']
  blankColor?: string
  center?: boolean
  block?: boolean
  fluid?: boolean
  fluidGrow?: boolean
  rounded?: string | boolean
  sizes?: string
  lazy?: boolean
  thumbnail?: boolean
  height?: string | number
  width?: string | number
  start?: boolean
  end?: boolean
}

const cardImgProps = withDefaults(defineProps<cardImgProps>(), {
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
