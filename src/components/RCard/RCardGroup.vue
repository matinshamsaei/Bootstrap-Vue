<script setup lang="ts">
import { useAttrs } from 'vue'

type CardGroupProps = {
  tag?: string
}

const cardGroupProps = withDefaults(defineProps<CardGroupProps>(), {
  tag: 'div'
})

const $cardGroupAttrs = useAttrs()

const cardGroupClass = ['card-group', $cardGroupAttrs.class]
</script>

<template>
  <component :is="cardGroupProps.tag" v-bind="$cardGroupAttrs" :class="cardGroupClass">
    <slot />
  </component>
</template>
