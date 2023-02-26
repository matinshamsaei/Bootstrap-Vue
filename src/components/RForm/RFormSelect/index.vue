<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
// const RFormSelectOption = defineAsyncComponent(() => import('@/components/RForm/RFormSelect/RFormSelectOption.vue'))
import { useAttrs, ref, onMounted } from 'vue'
import RFormSelectOption from './RFormSelectOption.vue'
import type { IObject } from '@/interfaces/object'

type Props = {
  modelValue: string | number | null
  options?: IObject[] | string[] | number[]
  size?: 'sm' | 'md' | 'lg'
  selectSize?: string | number
  textField?: string
  valueField?: string
  autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  textField: 'text',
  valueField: 'value',
  autoFocus: false
})

const attrs = useAttrs()

const select = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autoFocus) select.value?.focus()
})

const value = (option: IObject | number | string) => {
  if (typeof option === 'object') return option[props.valueField]
  else if (typeof option === 'number' || 'string') return option
}

const text = (option: IObject | number | string) => {
  if (typeof option === 'object') return option[props.textField]
  else if (typeof option === 'number' || 'string') return option
}

const disabled = (option: IObject | number | string) => {
  if (typeof option === 'object' && option.disabled) return true
  else return false
}
</script>

<template>
  <select
    ref="select"
    v-model="props.modelValue"
    :size="props.selectSize"
    v-bind="attrs"
    class="form-select"
    :class="`form-select-${props.size}`"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <template v-for="option in props.options">
      <RFormSelectOption :value="value(option)" :disabled="disabled(option)">
        {{ text(option) }}
      </RFormSelectOption>
    </template>

    <slot />
  </select>
</template>
