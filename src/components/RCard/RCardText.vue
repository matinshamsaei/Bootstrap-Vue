<script setup lang="ts">
import { useAttrs } from 'vue'

type CardTextProps = {
  textTag?: string
}

const $cardTextAttrs = useAttrs()

const cardTextProps = withDefaults(defineProps<CardTextProps>(), {
  textTag: 'p'
})

const cardTextclass = ['card-text', $cardTextAttrs.class]
</script>

<template>
  <component :is="cardTextProps.textTag" v-bind="$cardTextAttrs" :class="cardTextclass">
    <slot />
  </component>
</template>
