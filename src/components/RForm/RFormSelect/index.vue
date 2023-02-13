<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
// const RFormSelectOption = defineAsyncComponent(() => import('@/components/RForm/RFormSelect/RFormSelectOption.vue'))

import { useAttrs } from 'vue'
import RFormSelectOption from './RFormSelectOption.vue'

type Props = {
  modelValue: string | number | null
  options?: { value: string | number | boolean | null; text: string; disabled?: boolean }[]
  size?: 'sm' | 'md' | 'lg'
  selectSize?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const attrs = useAttrs()
</script>

<template>
  <select
    v-model="props.modelValue"
    :size="props.selectSize"
    v-bind="attrs"
    class="form-select"
    :class="`form-select-${props.size}`"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <slot />

    <template v-for="option in props.options">
      <RFormSelectOption :value="option.value" :disabled="option.disabled">
        {{ option.text }}
      </RFormSelectOption>
    </template>
  </select>
</template>
