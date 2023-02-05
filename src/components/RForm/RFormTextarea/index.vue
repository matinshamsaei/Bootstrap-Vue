<script setup>
import { useAttrs, computed } from 'vue'

const props = defineProps({
  modelValue: {
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  plainText: {
    type: Boolean,
    default: false
  },
  noResize: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  if (props.plainText) return 'form-control-plaintext'
  return 'form-control'
})

const attrs = useAttrs()
</script>

<template>
  <textarea
    :value="props.modelValue"
    v-bind="attrs"
    :class="[classes, `form-select-${props.size}`, { 'no-resize': props.noResize }]"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
