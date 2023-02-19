<script setup lang="ts">
import { ref, useSlots, useAttrs } from 'vue'

type CheckboxValueType = string | number | boolean | null

type Props = {
  modelValue?: CheckboxValueType
  id?: string
  disabled?: boolean
  value?: CheckboxValueType
  uncheckedValue?: CheckboxValueType
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const slots = useSlots()

function idGenerator(): string {
  if (props.id) return props.id
  return labelToId()
}

function labelToId(): string {
  if (slots.default) {
    const label = slots.default()[0].children as string
    return (label && label.trim().replace(' ', '-')) || ''
  }
  return ''
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isChecked = ref(false)

function changeHandler(event: Event) {
  const checkbox = event.target as HTMLInputElement
  let value = checkbox.value as CheckboxValueType
  if (checkbox.checked) isChecked.value = true
  else isChecked.value = false
  value = valueGenerator()
  emits('update:modelValue', value as string)
}

function valueGenerator(): CheckboxValueType {
  if (isChecked.value) {
    if (props.value) return props.value
    return true
  } else {
    if (props.uncheckedValue) return props.uncheckedValue
    return ''
  }
}

const attrs = useAttrs()
</script>

<template>
  <div class="form-check" v-bind="attrs">
    <input
      class="form-check-input"
      type="checkbox"
      :value="valueGenerator()"
      :id="idGenerator()"
      :disabled="props.disabled"
      @change="changeHandler"
    />

    <label class="form-check-label" :for="idGenerator()">
      <slot />
    </label>
  </div>
</template>
