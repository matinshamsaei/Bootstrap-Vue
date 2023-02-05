<script setup lang="ts">
import { useAttrs } from 'vue'

type ImgAttrs = {
  src?: string
  alt?: string
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  preload?: boolean
  loading?: 'lazy'
  lazy?: boolean
  image?: boolean
  fluid?: boolean
  thumbnail?: boolean
  height?: string | number
  width?: string | number
  start?: boolean
  end?: boolean
  center?: boolean
  sizes?: string
}

const imgProps = withDefaults(defineProps<ImgAttrs>(), {
  image: true,
  lazy: true,
  fluid: false,
  thumbnail: false,
  center: false,
  start: false,
  end: false
})

const $imgAttrs = useAttrs()

const imgAttrs: ImgAttrs = {
  src: imgProps.src,
  alt: imgProps.alt,
  fit: imgProps.fit,
  preload: imgProps.preload,
  image: imgProps.image,
  sizes: imgProps.sizes,
  width: imgProps.width,
  height: imgProps.height,
  ...$imgAttrs
}

const imgClass = [
  {
    'img-fluid': imgProps.fluid,
    'img-thumbnail': imgProps.thumbnail,
    'float-start': imgProps.start,
    'float-end': imgProps.end,
    'mx-auto d-block': imgProps.center
  }
]

if (imgProps.lazy) imgAttrs.loading = 'lazy'

const emit = defineEmits(['load'])

const load = () => {
  emit('load')
}
</script>

<template>
  <nuxt-img v-if="imgProps.image && !!imgProps.src" :class="imgClass" v-bind="imgAttrs" @load="load" />

  <nuxt-picture v-else-if="!!imgProps.src" :class="imgClass" v-bind="imgAttrs" @load="load" />
</template>
