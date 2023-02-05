<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'
import CardTitle from './RCardTitle.vue'
import CardSubtitle from './RCardSubtitle.vue'
// const CardTitle = defineAsyncComponent(() => import('./RCardTitle.vue'))
// const CardSubTitle = defineAsyncComponent(() => import('./RCardSubtitle.vue'))

type CardBodyProps = {
  bodyBgVariant?: string
  bodyTextVariant?: string
  bodyBorderVariant?: string
  bodyClass?: HTMLAttributes['class']
  bodyTag?: string
  overlay?: boolean

  // card title
  title?: string
  titleTag?: string

  // card sub title
  subTitle?: string
  subTitleTag?: string
  subTitleTextVariant?: string
}

const cardBodyProps = withDefaults(defineProps<CardBodyProps>(), {
  bodyTag: 'div',
  overlay: false
})

const $cardBodyAttrs = useAttrs()

const cardBodyClass = [
  'card-body',
  cardBodyProps.bodyClass,
  {
    'card-img-overlay': cardBodyProps.overlay,
    [`bg-${cardBodyProps.bodyBgVariant}`]: cardBodyProps.bodyBgVariant,
    [`text-${cardBodyProps.bodyTextVariant}`]: cardBodyProps.bodyTextVariant,
    [`border-${cardBodyProps.bodyBorderVariant}`]: cardBodyProps.bodyBorderVariant
  },
  $cardBodyAttrs.class
]

// card title
const cardTitleAttrs = {
  title: cardBodyProps.title,
  titleTag: cardBodyProps.titleTag
}

// card subTitle
const cardSubtitleAttrs = {
  subTitle: cardBodyProps.subTitle,
  subTitleTag: cardBodyProps.subTitleTag,
  subTitleTextVariant: cardBodyProps.subTitleTextVariant
}
</script>

<template>
  <component :is="cardBodyProps.bodyTag" v-bind="$cardBodyAttrs" :class="cardBodyClass">
    <CardTitle v-if="cardBodyProps.title" v-bind="cardTitleAttrs" />

    <CardSubtitle v-if="cardBodyProps.subTitle" v-bind="cardSubtitleAttrs" />

    <slot />
  </component>
</template>
