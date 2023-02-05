<script setup lang="ts">
import { useAttrs } from 'vue'

type CardTitleProps = {
  title?: string
  titleTag?: string
}

const cardTitleProps = withDefaults(defineProps<CardTitleProps>(), {
  titleTag: 'h4'
})

const $cardTitleAttrs = useAttrs()

const cardTitleclass = ['card-title', $cardTitleAttrs.class]
</script>

<template>
  <component :is="cardTitleProps.titleTag" v-bind="$cardTitleAttrs" :class="cardTitleclass">
    <template v-if="!!cardTitleProps.title">
      {{ cardTitleProps.title }}
    </template>

    <slot v-else />
  </component>
</template>
