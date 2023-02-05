<script setup>
import { useAttrs, useSlots } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  marginBottom: {
    type: [String, Number],
    default: 3,
    validator(value) {
      return [0, 1, 2, 3, 4, 5].includes(value || +value)
    }
  },
  prepend: String,
  append: String
})

const slots = useSlots()

const attrs = useAttrs()
</script>

<template>
  <div v-bind="attrs" class="input-group" :class="[`input-group-${props.size}`, `mb-${props.marginBottom}`]">
    <span v-if="props.prepend" class="input-group-text">
      {{ props.prepend }}
    </span>

    <slot name="prepend" v-if="slots.prepend" class="input-group-text" />

    <slot />

    <span v-if="props.append" class="input-group-text">
      {{ props.append }}
    </span>

    <slot name="append" v-if="slots.append" class="input-group-text" />
  </div>
</template>
