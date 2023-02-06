<script setup>
// import { defineAsyncComponent } from 'vue'
// const RFormSelectOption = defineAsyncComponent(() => import('@/components/RForm/RFormSelect/RFormSelectOption.vue'))

import { useAttrs } from 'vue'
import RFormSelectOption from './RFormSelectOption.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  /**
   * Select options
   * @array of objects [{value: string | boolean | number, text: string}]
   */
  options: {
    type: Array // [{value: 'test' || 0, text: 'text'}]
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  selectSize: [String, Number]
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
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <slot />

    <template v-for="option in props.options">
      <RFormSelectOption :value="option.value" :disabled="option.disabled" :selected="option.selected">
        {{ option.text }}
      </RFormSelectOption>
    </template>
  </select>
</template>
