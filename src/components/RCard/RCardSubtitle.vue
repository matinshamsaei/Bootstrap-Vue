<script setup lang="ts">
import { useAttrs } from 'vue'

type CardSubTitleProps = {
  subTitle?: string
  subTitleTag?: string
  subTitleTextVariant?: string
}

const cardSubTitleProps = withDefaults(defineProps<CardSubTitleProps>(), {
  subTitleTag: 'h6',
  subTitleTextVariant: 'muted'
})

const $cardSubTitleAttrs = useAttrs()

const cardSubTitleclass = [`text-${cardSubTitleProps.subTitleTextVariant}`, 'card-subtitle', $cardSubTitleAttrs.class]
</script>

<template>
  <component :is="cardSubTitleProps.subTitleTag" v-bind="$cardSubTitleAttrs" :class="cardSubTitleclass">
    <template v-if="!!cardSubTitleProps.subTitle">
      {{ cardSubTitleProps.subTitle }}
    </template>

    <slot v-else />
  </component>
</template>
