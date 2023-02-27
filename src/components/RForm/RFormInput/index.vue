<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useAttrs, computed, onMounted, ref } from 'vue'

type Props = {
  modelValue: string | number
  type?: 'text' | 'range' | 'color' | 'password' | 'number' | 'email' | 'url' | 'search' | 'date'
  size?: 'sm' | 'md' | 'lg'
  plainText?: boolean
  debounce?: string | number
  autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  plainText: false,
  debounce: '300',
  autoFocus: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const debouncedFn = useDebounceFn((event: Event) => {
  const input = event.target as HTMLInputElement
  emits('update:modelValue', input.value)
}, +props.debounce)

const inputClass = computed(() => {
  if (props.type === 'range') return 'form-range'
  else if (props.type === 'color') return 'form-control form-control-color'
  else if (props.plainText) return 'form-control-plaintext'
  return 'form-control'
})

const attrs = useAttrs()

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autoFocus) input.value?.focus()
})
</script>

<template>
  <input
    ref="input"
    :type="props.type"
    :value="props.modelValue"
    v-bind="attrs"
    :class="[inputClass, `form-control-${props.size}`]"
    @input="debouncedFn"
  />
</template>
