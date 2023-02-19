<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()

type Props = {
  value: string | number | boolean
  id?: string
  modelValue?: string | number | boolean
  name?: string
  checked?: boolean
  disabled?: boolean
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  checked: false,
  disabled: false,
  inline: false
})

const componentClass = [
  'form-check',
  {
    'form-check-inline': props.inline,
    disabled: props.disabled,
    checked: props.checked
  }
]
</script>

<template>
  <div v-bind="attrs" :class="componentClass">
    <input
      :id="props.id"
      :name="props.name"
      :value="props.value"
      :checked="props.checked"
      :disabled="props.disabled"
      type="radio"
      @change="$emit('update:modelValue', props.value)"
      class="form-check-input"
    />
    <label class="form-check-label" :for="props.id"> <slot /> </label>
  </div>
</template>
