<script setup>
import { useDebounceFn } from '@vueuse/core'
import { useAttrs, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator(value) {
      return ['text', 'range', 'color', 'password', 'number', 'email', 'url', 'search', 'date'].includes(value)
    }
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
  debounce: {
    type: [String, Number],
    default: '300'
  }
})

const emits = defineEmits(['update:modelValue'])

const inputClass = computed(() => {
  if (props.type === 'range') return 'form-range'
  else if (props.type === 'color') return 'form-control form-control-color'
  else if (props.plainText) return 'form-control-plaintext'
  return 'form-control'
})

const attrs = useAttrs()

const debouncedFn = useDebounceFn((event) => {
  emits('update:modelValue', event)
}, props.debounce)
</script>

<template>
  <input
    :type="props.type"
    :value="props.modelValue"
    v-bind="attrs"
    :class="[inputClass, `form-control-${props.size}`]"
    @input="debouncedFn($event.target.value)"
  />
</template>
