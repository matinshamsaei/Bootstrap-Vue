<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
// const RFormSelectOption = defineAsyncComponent(() => import('@/components/RForm/RFormSelect/RFormSelectOption.vue'))

import { useAttrs } from 'vue'
import RFormSelectOption from './RFormSelectOption.vue'

export interface IObject {
  [key: string]: any
}

type Props = {
  modelValue: string | number | null
  options?: IObject[]
  size?: 'sm' | 'md' | 'lg'
  selectSize?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  textField: 'text',
  valueField: 'value'
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
    <template v-for="option in props.options">
      <RFormSelectOption :value="option[props.valueField]" :disabled="option.disabled">
        {{ option[props.textField] }}
      </RFormSelectOption>
    </template>

    <slot />
  </select>
</template>
