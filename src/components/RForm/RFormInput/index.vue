<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useAttrs, computed, onMounted, ref } from 'vue'

type Props = {
  modelValue: string | number | null
  type?: 'text' | 'range' | 'color' | 'password' | 'number' | 'email' | 'url' | 'search' | 'date'
  size?: 'sm' | 'md' | 'lg'
  plainText?: boolean
  debounce?: string | number
  autoFocus?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: any): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  plainText: false,
  debounce: '300',
  autoFocus: false
})

const emits = defineEmits<Emits>()

const input = useDebounceFn((event: Event) => {
  const input = event.target as HTMLInputElement
  model.value = input.value

  emits('change', event)
}, +props.debounce)

const inputClass = computed(() => {
  if (props.type === 'range') return 'form-range'
  else if (props.type === 'color') return 'form-control form-control-color'
  else if (props.plainText) return 'form-control-plaintext'
  return 'form-control'
})

const attrs = useAttrs()

const element = ref<HTMLInputElement | null>(null)

const model = computed({
  get() {
    if (props.modelValue === null) return ''
    else return props.modelValue
  },
  set(val: any) {
    if (val === '') val = null
    emits('update:modelValue', val)
    emits('input', val)
  }
})

onMounted(() => {
  if (props.autoFocus) element.value?.focus()
})
</script>

<template>
  <input
    ref="element"
    :type="props.type"
    :value="model"
    :class="[inputClass, `form-control-${props.size}`]"
    v-bind="attrs"
    @input="input"
  />
</template>
