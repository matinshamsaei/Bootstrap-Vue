<script setup lang="ts">
import type { HtmlHTMLAttributes, HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'

type CardHeaderProps = {
  header?: string
  headerHtml?: HtmlHTMLAttributes
  headerBgVariant?: string
  headerTextVariant?: string
  headerBorderVariant?: string
  headerClass?: HTMLAttributes['class']
  headerTag?: string
}

const cardHeaderProps = withDefaults(defineProps<CardHeaderProps>(), {
  headerTag: 'div'
})

const $cardHeaderAttrs = useAttrs()

const cardHeaderClass = [
  cardHeaderProps.headerClass,
  {
    [`bg-${cardHeaderProps.headerBgVariant}`]: cardHeaderProps.headerBgVariant,
    [`border-${cardHeaderProps.headerBorderVariant}`]: cardHeaderProps.headerBorderVariant,
    [`text-${cardHeaderProps.headerTextVariant}`]: cardHeaderProps.headerTextVariant
  },
  'card-header',
  $cardHeaderAttrs.class
]
</script>

<template>
  <component :is="cardHeaderProps.headerTag" v-bind="$cardHeaderAttrs" :class="cardHeaderClass">
    <div v-if="!!cardHeaderProps.headerHtml" v-html="cardHeaderProps.headerHtml" />

    <template v-else-if="!!cardHeaderProps.header">
      {{ cardHeaderProps.header }}
    </template>

    <slot v-else />
  </component>
</template>
