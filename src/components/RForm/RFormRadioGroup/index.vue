<script setup lang="ts">
import RFormRadio from '@/components/RForm/RFormRadioGroup/RFormRadio.vue'
import { useAttrs, reactive, useSlots } from 'vue'
import type { IObject } from '@/interfaces/object'

const attrs = useAttrs()

const slots = useSlots()

type Props = {
  modelValue: string | number | boolean
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

function getRadios(slots: any): any[] {
  if (!slots || !slots.default) return []

  return slots.default().reduce((arr: number[], slot: any) => {
    if (typeof slot.type === 'symbol') arr = arr.concat(slot.children)
    else arr.push(slot)
    return arr
  }, [])
}

const items = reactive(getRadios(slots))

const itemsForRender: any = reactive(
  items.map((item) => ({
    id: item.props.id,
    value: item.props.value,
    disabled: item.props.disabled === '' ? true : false,
    text: item.children.default()[0].children
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
    v-for="option in props.options"
    :class="componentClass"
    :name="props.name"
    :id="option[valueField]"
    :checked="option.checked || props.checked"
    :disabled="option.disabled || props.disabled"
    :value="option[valueField]"
  >
    {{ option[textField] }}
  </RFormRadio>

  <div v-if="itemsForRender" v-bind="attrs" v-for="item in itemsForRender" :class="componentClass">
    <input
      :name="props.name"
      :id="item.value"
      :checked="item.checked"
      :disabled="item.disabled || props.disabled"
      :value="item.value"
      type="radio"
      @change="$emit('update:modelValue', item.value)"
      class="form-check-input"
    />
    <label :for="item.value" v-html="item.text" class="form-check-label"> </label>
  </div>
</template>
