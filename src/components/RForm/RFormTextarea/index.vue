<script setup lang="ts">
import { useAttrs, computed, onMounted, ref } from 'vue'

type Props = {
  modelValue: string
  size?: 'sm' | 'md' | 'lg'
  plainText?: boolean
  noResize?: boolean
  autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  plainText: false,
  noResize: false,
  autoFocus: false
})

const classes = computed(() => {
  if (props.plainText) return 'form-control-plaintext'
  return 'form-control'
})

const attrs = useAttrs()

const textarea = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autoFocus) textarea.value?.focus()
})
</script>

<template>
  <textarea
    ref="textarea"
    :value="props.modelValue"
    v-bind="attrs"
    :class="[classes, `form-select-${props.size}`, { 'no-resize': props.noResize }]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
