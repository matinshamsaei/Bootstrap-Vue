<script setup lang="ts">
import type { ImgHTMLAttributes, HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'

type ImgProps = {
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

// Blank image with fill template
const BLANK_TEMPLATE =
  '<svg width="%{w}" height="%{h}" ' +
  'xmlns="http://www.w3.org/2000/svg" ' +
  'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">' +
  '<rect width="100%" height="100%" style="fill:%{f};"></rect>' +
  '</svg>'

// --- Helper methods ---

const makeBlankImgSrc = (width: string | number | null, height: string | number | null, color: string) => {
  const src = encodeURIComponent(
    BLANK_TEMPLATE.replace('%{w}', String(width)).replace('%{h}', String(height)).replace('%{f}', color)
  )

  return `data:image/svg+xml;charset=UTF-8,${src}`
}

const imgProps = withDefaults(defineProps<ImgProps>(), {
  image: true,
  lazy: true,
  fluid: false,
  blank: false,
  block: false,
  thumbnail: false,
  blankColor: 'transparent',
  center: false,
  start: false,
  end: false
})

const toInteger = (value: any, defaultValue = NaN): number => {
  const integer = parseInt(value, 10)
  return isNaN(integer) ? defaultValue : integer
}

let { alt, src, block } = imgProps
let width = toInteger(imgProps.width) || null
let height = toInteger(imgProps.height) || null
let align: string | null = null
let sizes = imgProps.sizes

if (imgProps.blank) {
  if (!height && width) {
    height = width
  } else if (!width && height) {
    width = height
  }
  if (!width && !height) {
    width = 1
    height = 1
  }
  // Make a blank SVG image
  src = makeBlankImgSrc(width, height, imgProps.blankColor || 'transparent')
}

if (imgProps.start) align = 'float-start'
else if (imgProps.end) align = 'float-end'
else if (imgProps.center) {
  align = 'mx-auto'
  block = true
}

const imgClass = [
  imgProps.class,
  {
    'img-fluid': imgProps.fluid,
    'img-thumbnail': imgProps.thumbnail,
    'w-100': imgProps.fluidGrow,
    rounded: imgProps.rounded === '' || imgProps.rounded,
    [`rounded-${imgProps.rounded}`]: typeof imgProps.rounded === 'string' && imgProps.rounded !== '',
    'float-start': imgProps.start,
    [`${align}`]: align,
    'd-block': block
  }
]

const $imgAttrs = useAttrs()

const imgAttrs: ImgHTMLAttributes = {
  sizes: sizes,
  width: width ? width : '',
  height: height ? height : '',
  ...$imgAttrs
}
</script>

<template>
  <img :src="src" :alt="alt" :class="imgClass" v-bind="imgAttrs" />
</template>
