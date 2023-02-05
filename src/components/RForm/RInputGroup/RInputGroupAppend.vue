<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  isText: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span v-if="props.isText" v-bind="attrs" class="input-group-text">
    <slot />
  </span>

  <slot v-else v-bind="attrs" class="input-group-text" />
</template>
