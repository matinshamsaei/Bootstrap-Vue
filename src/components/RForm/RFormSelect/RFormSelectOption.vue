<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number, null],
    required: true
  }
})

const attrs = useAttrs()
</script>

<template>
  <option :value="props.value" v-bind="attrs">
    <slot />
  </option>
</template>
