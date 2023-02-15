<script setup>
// const RThead = defineAsyncComponent(() => import('@/components/RTable/RThead.vue'))
import RThead from './RThead'

const props = defineProps({
  variant: {
    type: String,
    default: ''
  },
  headVariant: {
    type: String,
    default: ''
  },
  rowVariant: {
    type: String,
    default: ''
  },
  cellVariant: {
    type: String,
    default: ''
  },
  striped: {
    type: Boolean,
    default: true
  },
  hover: {
    type: Boolean,
    default: true
  },
  responsive: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  },
  borderVariant: {
    type: String,
    default: ''
  },
  borderless: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: []
  },
  fields: {
    type: Array,
    default: []
  },
  emptyText: {
    type: String,
    default: 'There are no records to show'
  },
  sortBy: {
    type: String,
    default: 'id'
  },
  sortDesc: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['context-changed', 'refreshed'])

const tableClasses = {
  [`table-${props.variant}`]: props.variant,
  'table-striped': props.striped,
  'table-hover': props.hover,
  'table-bordered': props.bordered,
  [`border-${props.borderVariant}`]: props.borderVariant,
  'table-borderless': props.borderless,
  'table-sm': props.small
}

const responsiveClass = { 'table-responsive': props.responsive }

const rowCalsses = {
  [`table-${props.rowVariant}`]: props.rowVariant
}

const cellCalsses = {
  [`table-${props.cellVariant}`]: props.cellVariant
}

const emitContextChanged = (item) => {
  emit('context-changed', item)
}

const slots = useSlots()

onUpdated(() => {
  emit('refreshed')
})
</script>

<template>
  <div :class="responsiveClass">
    <table class="table" :class="tableClasses">
      <RThead :table-props="props" @sort="emitContextChanged" />

      <tbody v-if="props.items.length">
        <tr v-for="(item, index) in props.items" :class="rowCalsses">
          <td v-for="(value, index) in props.fields">
            <slot v-if="slots[value.key]" :name="value.key" :item="item" />

            <div v-else>{{ item[value.key] }}</div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td :colspan="props.fields.length">
            <p v-if="props.emptyText" class="text-center mb-0">{{ props.emptyText }}</p>
            <slot v-else name="empty" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
