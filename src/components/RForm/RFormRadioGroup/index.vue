<script setup lang="ts">
import RFormRadio from '@/components/RForm/RFormRadioGroup/RFormRadio.vue'
import { useAttrs, reactive, useSlots } from 'vue'

export interface IObject {
  [key: string]: any
}

const attrs = useAttrs()

const slots = useSlots()

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
  value: false,
  checked: false,
  disabled: false,
  inline: false,
  textField: 'text',
  valueField: 'value'
})

function getRadio(slots: any): any[] {
  if (!slots || !slots.default) return []

  return slots.default().reduce((arr: number[], slot: any) => {
    if (typeof slot.type === 'symbol') arr = arr.concat(slot.children)
    else arr.push(slot)
    return arr
  }, [])
}

const items = reactive(getRadio(slots))

const itemsForRender: any = reactive(
  items.map((item) => ({
    id: item.props.id,
    value: item.props.value,
    disabled: item.props.disabled === '' ? true : false,
    checked: false
  }))
)

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
  <RFormRadio
    v-if="props.options"
    v-bind="attrs"
    v-for="item in itemsForRender"
    :class="componentClass"
    :name="props.name"
    :id="item.value"
    :checked="props.checked"
    :disabled="props.disabled"
    :value="item.value"
  />

  <div v-else v-bind="attrs" v-for="option in options" :class="componentClass">
    <input
      :name="props.name"
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
