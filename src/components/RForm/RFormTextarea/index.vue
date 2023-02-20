<script setup lang="ts">
import { useAttrs, computed } from 'vue'

type Props = {
  modelValue: string
  size?: 'sm' | 'md' | 'lg'
  plainText?: boolean
  noResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  plainText: false,
  noResize: false
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
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
