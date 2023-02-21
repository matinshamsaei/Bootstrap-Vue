<script setup lang="ts">
import { useSlots, onUpdated } from 'vue'
// const RThead = defineAsyncComponent(() => import('@/components/RTable/RThead.vue'))
import RThead from '@/components/RTable/RThead.vue'

export type Props = {
  variant?: string
  headVariant?: string
  rowVariant?: string
  cellVariant?: string
  striped?: boolean
  hover?: boolean
  responsive?: boolean
  bordered?: boolean
  borderVariant?: string
  borderless?: boolean
  small?: boolean
  items?: object[]
  fields?: string[] | { key: string; label?: string; sortable?: boolean }[]
  emptyText?: string
  sortBy?: string
  sortDesc?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: '',
  headVariant: '',
  rowVariant: '',
  cellVariant: '',
  striped: true,
  hover: true,
  responsive: true,
  bordered: false,
  borderVariant: '',
  borderless: false,
  small: false,
  items: () => [],
  fields: () => [],
  emptyText: 'There are no records to show',
  sortBy: 'id',
  sortDesc: false
})

const emit = defineEmits<{
  (e: 'context-changed', item: object): void
  (e: 'refreshed'): void
}>()

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

const rowClasses = {
  [`table-${props.rowVariant}`]: props.rowVariant
}

// const cellClasses = {
//   [`table-${props.cellVariant}`]: props.cellVariant
// }

const emitContextChanged = (item: {}) => {
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
        <tr v-for="item in props.items" :class="rowClasses">
          <td v-if="props.fields.length" v-for="field in props.fields">
            <template v-if="typeof field === 'string'">
              {{ item[field] }}
            </template>

            <template v-else>
              <slot v-if="slots[field.key]" :name="field.key" :item="item" />

              <div v-else>{{ item[field.key] }}</div>
            </template>
          </td>

          <td v-else v-for="field in Object.keys(item)">
            {{ item[field] }}
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
