<script setup lang="ts">
export type CardProps = {
  tag?: string
  align?: string
  bgVariant?: string
  noBody?: boolean
  textVariant?: string

  // card body
  borderVariant?: string
  bodyBgVariant?: string
  bodyTextVariant?: string
  bodyBorderVariant?: string
  bodyClass?: HTMLAttributes['class']
  bodyTag?: string
  overlay?: boolean

  // card footer
  footer?: string
  footerBgVariant?: string
  footerBorderVariant?: string
  footerClass?: HTMLAttributes['class']
  footerHtml?: HtmlHTMLAttributes
  footerTag?: string
  footerTextVariant?: string

  // card header
  header?: string
  headerBgVariant?: string
  headerBorderVariant?: string
  headerClass?: HTMLAttributes['class']
  headerHtml?: HtmlHTMLAttributes
  headerTag?: string
  headerTextVariant?: string

  // card image
  imgAlt?: string
  imgClass?: HTMLAttributes['class']
  imgEnd?: boolean
  imgHeight?: string
  imgFluid?: boolean
  imgThumbnail?: boolean
  imgSrc?: string
  imgStart?: boolean
  imgCenter?: boolean
  imgWidth?: string
  imgLoading?: string
  imgSizes?: string
  imgLazy?: boolean

  // card title
  title?: string
  titleTag?: string

  // card subTitle
  subTitle?: string
  subTitleTag?: string
  subTitleTextVariant?: string
}

import type { HTMLAttributes, HtmlHTMLAttributes } from 'vue'
import { useAttrs } from 'vue'

import RCardTitle from './RCardTitle.vue';
import RCardImg from './RCardImg.vue';
import RCardSubTitle from './RCardSubtitle.vue';
import RCardHeader from './RCardHeader.vue';
import RCardFooter from './RCardFooter.vue';

// const RCardTitle = defineAsyncComponent(() => import('./RCardTitle.vue'))
// const RCardImg = defineAsyncComponent(() => import('./RCardImg.vue'))
// const RCardSubTitle = defineAsyncComponent(() => import('./RCardSubtitle.vue'))
// const RCardHeader = defineAsyncComponent(() => import('./RCardHeader.vue'))
// const RCardBody = defineAsyncComponent(() => import('./RCardBody.vue'))
// const RCardFooter = defineAsyncComponent(() => import('./RCardFooter.vue'))

// card
const cardProps = withDefaults(defineProps<CardProps>(), {
  tag: 'div'
})

const $cardAttrs = useAttrs()

const cardClass = [
  'card',
  {
    [`text-${cardProps.align}`]: !!cardProps.align,
    [`bg-${cardProps.bgVariant}`]: !!cardProps.bgVariant,
    [`border-${cardProps.borderVariant}`]: !!cardProps.borderVariant,
    [`text-${cardProps.textVariant}`]: !!cardProps.textVariant
  },
  $cardAttrs.class
]

// card title
const rCardTitleAttrs = {
  title: cardProps.title,
  titleTag: cardProps.titleTag
}

// card image
const rCardImgAttrs = {
  src: cardProps.imgSrc,
  alt: cardProps.imgAlt,
  // loading: cardProps.imgLoading,
  lazy: cardProps.imgLazy,
  class: cardProps.imgClass,
  fluid: cardProps.imgFluid,
  thumbnail: cardProps.imgThumbnail,
  height: cardProps.imgHeight,
  width: cardProps.imgWidth,
  start: cardProps.imgStart,
  end: cardProps.imgEnd,
  center: cardProps.imgCenter,
  sizes: cardProps.imgSizes
}

// card subTitle
const rCardSubTitleAttrs = {
  subTitle: cardProps.subTitle,
  subTitleTag: cardProps.subTitleTag,
  subTitleTextVariant: cardProps.subTitleTextVariant
}

// card header
const rCardHeaderAttrs = {
  header: cardProps.header,
  headerTag: cardProps.headerTag,
  headerHtml: cardProps.headerHtml,
  headerClass: cardProps.headerClass,
  headerBgVariant: cardProps.headerBgVariant,
  headerTextVariant: cardProps.headerTextVariant,
  headerBorderVariant: cardProps.headerBorderVariant
}

// card body
const rCardBodyAttrs = {
  overlay: cardProps.overlay,
  bodyTag: cardProps.bodyTag,
  bodyClass: cardProps.bodyClass,
  bodyBgVariant: cardProps.bodyBgVariant,
  bodyTextVariant: cardProps.bodyTextVariant,
  bodyBorderVariant: cardProps.bodyBorderVariant,
  title: cardProps.title,
  titleTag: cardProps.titleTag,
  subTitle: cardProps.subTitle,
  subTitleTag: cardProps.subTitleTag,
  subTitleTextVariant: cardProps.subTitleTextVariant
}

// card footer
const rCardFooterAttrs = {
  footer: cardProps.footer,
  footerTag: cardProps.footerTag,
  footerHtml: cardProps.footerHtml,
  footerClass: cardProps.footerClass,
  footerBgVariant: cardProps.footerBgVariant,
  footerTextVariant: cardProps.footerTextVariant,
  footerBorderVariant: cardProps.footerBorderVariant
}
</script>

<template>
  <component :is="cardProps.tag" v-bind="$cardAttrs" :class="cardClass">
    <RCardHeader v-if="cardProps.header" v-bind="rCardHeaderAttrs">
      <slot v-if="$slots.header" name="header" />
    </RCardHeader>

    <RCardImg v-if="!!cardProps.imgSrc" v-bind="rCardImgAttrs" />

    <RCardTitle v-if="cardProps.noBody && cardProps.title" v-bind="rCardTitleAttrs" />

    <RCardSubTitle v-if="cardProps.noBody && cardProps.subTitle" v-bind="rCardSubTitleAttrs" />

    <RCardBody v-if="!cardProps.noBody" v-bind="rCardBodyAttrs">
      <slot />
    </RCardBody>

    <slot v-else />

    <RCardFooter v-if="cardProps.footer" v-bind="rCardFooterAttrs">
      <slot v-if="$slots.footer" name="footer" />
    </RCardFooter>
  </component>
</template>
