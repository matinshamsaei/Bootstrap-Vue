<script setup lang="ts">
import type { HTMLAttributes, HtmlHTMLAttributes } from 'vue'
import { useAttrs } from 'vue'

type CardFooterProps = {
  footer?: string
  footerHtml?: HtmlHTMLAttributes
  footerClass?: HTMLAttributes['class']
  footerBgVariant?: string
  footerTextVariant?: string
  footerBorderVariant?: string
  footerTag?: string
}

const cardFooterProps = withDefaults(defineProps<CardFooterProps>(), {
  footerTag: 'div'
})

const $cardFooterAttrs = useAttrs()

const cardFooterClass = [
  'card-footer',
  {
    [`bg-${cardFooterProps.footerBgVariant}`]: !!cardFooterProps.footerBgVariant,
    [`border-${cardFooterProps.footerBorderVariant}`]: !!cardFooterProps.footerBorderVariant,
    [`text-${cardFooterProps.footerTextVariant}`]: !!cardFooterProps.footerTextVariant
  },
  $cardFooterAttrs.class
]
</script>

<template>
  <component :is="cardFooterProps.footerTag" v-bind="$cardFooterAttrs" :class="cardFooterClass">
    <div v-if="!!cardFooterProps.footerHtml" v-html="cardFooterProps.footerHtml" />

    <template v-else-if="!!cardFooterProps.footer">
      {{ cardFooterProps.footer }}
    </template>

    <slot v-else />
  </component>
</template>
