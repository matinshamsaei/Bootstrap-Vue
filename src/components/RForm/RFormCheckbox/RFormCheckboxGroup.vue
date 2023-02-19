<script setup lang="ts">
import RFormCheckbox from '@/components/RForm/RFormCheckbox/RFormCheckbox.vue'
import { useSlots, reactive } from 'vue'

type Props = {
  label: string
  modelValue?: string[]
  options?: { text?: string; value?: string; disabled?: boolean }[]
}

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots()

function getCheckBox(slots: any): any[] {
  if (!slots || !slots.default) return []

  return slots.default().reduce((arr: number[], slot: any) => {
    if (typeof slot.type === 'symbol') {
      arr = arr.concat(slot.children)
    } else {
      arr.push(slot)
    }
    return arr
  }, [])
}
const items = reactive(getCheckBox(slots))

let itemsForRender: any = reactive([])
if (props.options) {
  itemsForRender = reactive(
    props.options.map((option) => ({
      text: option.text,
      value: option.value,
      disabled: option.disabled ? true : false,
      modelValue: null
    }))
  )
} else {
  itemsForRender = reactive(
    items.map((item) => ({
      value: item.props.value,
      disabled: item.props.disabled === '' ? true : false,
      uncheckedValue: item.props.uncheckedValue ? item.props.uncheckedValue : '',
      modelValue: null,
      isChecked: false
    }))
  )
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

function changeHandler(event: Event, item: any) {
  const checkbox = event.target as HTMLInputElement
  if (checkbox.checked) item.isChecked = true
  else item.isChecked = false
  const model = createModel()
  emits('update:modelValue', model)
}

function valueGenerator(item: any) {
  if (item.isChecked) {
    if (item.value) return item.value
    return true
  } else {
    if (item.uncheckedValue) return item.uncheckedValue
    return ''
  }
}

function createModel() {
  const selectedItems = itemsForRender.filter((item: any) => item.isChecked)
  return selectedItems.map((item: any) => item.value)
}
</script>

<template>
  <fieldset>
    <legend if="props.label">{{ props.label }}</legend>

    <div class="checkbox-group">
      <r-form-checkbox
        v-for="item in itemsForRender"
        v-model="item.modelValue"
        :value="valueGenerator(item)"
        :disabled="item.disabled"
        @change="changeHandler($event, item)"
      >
        {{ item.text ? item.text : item.value }}
      </r-form-checkbox>
    </div>
  </fieldset>
</template>
