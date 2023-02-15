<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()

type Props = {
  id?: string | undefined
  value: string | number | boolean
  name?: string
  checked?: boolean
  disabled?: boolean
  options?: { text: string; value: string }[]
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  value: false,
  checked: false,
  disabled: false,
  inline: false
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
      :name="props.name"
      :id="option.value"
      :checked="props.checked"
      :disabled="props.disabled"
      :value="option.value"
      type="radio"
      @change="$emit('update:modelValue', option.value)"
      class="form-check-input"
    />
    <label :for="option.value" class="form-check-label">
      {{ option.text }}
    </label>
  </div>
</template>
