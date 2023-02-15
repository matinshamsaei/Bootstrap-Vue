<script setup lang="ts">
import { useAttrs } from 'vue'

export interface IObject {
  [key: string]: any
}

const attrs = useAttrs()

type Props = {
  modelValue: string | number | boolean | null
  id?: string
  name?: string
  checked?: boolean
  disabled?: boolean
  options?: IObject[]
  inline?: boolean
  textField?: string
  valueField?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  checked: false,
  disabled: false,
  inline: false,
  textField: 'text',
  valueField: 'value'
})

const componentClass = [
  'form-check',
  'mr-1',
  {
    'form-check-inline': props.inline,
    disabled: props.disabled,
    checked: props.checked
  }
]
</script>

<template>
  <div v-bind="attrs" v-for="option in options" :class="componentClass">
    <input
      :name="option[props.textField]"
      :id="option.value"
      :checked="props.checked"
      :disabled="props.disabled"
      :value="option[props.valueField]"
      type="radio"
      @change="$emit('update:modelValue', option[props.valueField])"
      class="form-check-input"
    />
    <label :for="option[props.valueField]" class="form-check-label">
      {{ option[props.textField] }}
    </label>
  </div>
</template>
