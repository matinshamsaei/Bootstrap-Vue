<script setup lang="ts">
import { useSlots, onUpdated, computed } from 'vue'
// const RThead = defineAsyncComponent(() => import('@/components/RTable/RThead.vue'))
import RThead from '@/components/RTable/RThead.vue'
import type { IObject } from '@/interfaces/object'

export type Fields = {
  key: string
  label?: string
  sortable?: boolean
  class?: string
  thStyle?: string
}

export type Props = {
  tableVariant?: string
  tableClass?: string | object | IObject[]
  tbodyTrClass?: string | [] | Function
  striped?: boolean
  hover?: boolean
  responsive?: boolean | string
  bordered?: boolean
  borderVariant?: string
  borderless?: boolean
  small?: boolean
  items?: IObject[]
  fields?: string[] | Fields[]
  sortBy?: string
  sortDesc?: boolean
  busy?: boolean
  showEmpty?: boolean
  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  striped: true,
  hover: true,
  responsive: true,
  bordered: false,
  borderVariant: '',
  borderless: false,
  small: false,
  items: () => [],
  fields: () => [],
  sortBy: 'id',
  sortDesc: false,
  busy: false,
  showEmpty: true,
  emptyText: 'There are no records to show'
})

const emit = defineEmits<{
  (e: 'sort-changed', item: object): void
  (e: 'refreshed'): void
  (e: 'row-contextmenu', item: object): void
  (e: 'row-clicked', item: object): void
}>()

const tableClasses = computed(() => ({
  [`table-${props.tableVariant}`]: props.tableVariant,
  'table-striped': props.striped,
  'table-hover': props.hover && !props.busy,
  'table-bordered': props.bordered,
  [`border-${props.borderVariant}`]: props.borderVariant,
  'table-borderless': props.borderless,
  'table-sm': props.small,
  'table-busy': props.busy
}))

const responsiveClass = computed(() => {
  if (typeof props.responsive === 'boolean' && props.responsive) return 'table-responsive'
  else if (typeof props.responsive === 'string') return `table-responsive-${props.responsive}`
})

function setTbodyTrClasses(item: any) {
  if (typeof props.tbodyTrClass === 'function') return props.tbodyTrClass(item)
  else return props.tbodyTrClass
}

const emitSortChanged = (item: object) => {
  emit('sort-changed', item)
}

const emitContextMenu = (arg: object) => {
  emit('row-contextmenu', arg)
}

const emitRowClicked = (item: object) => {
  emit('row-clicked', item)
}

const slots = useSlots()

onUpdated(() => {
  emit('refreshed')
})
</script>

<template>
  <div :class="responsiveClass">
    <table class="table" :class="[props.tableClass, tableClasses]">
      <RThead :table-props="props" @sort="emitSortChanged" />

      <tbody v-if="props.items.length">
        <tr
          v-for="(item, index) in props.items"
          :class="setTbodyTrClasses(item)"
          @contextmenu="emitContextMenu({ item, index, $event })"
          @click="emitRowClicked(item)"
        >
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
        <tr v-if="props.showEmpty">
          <td :colspan="props.fields.length">
            <slot v-if="slots.empty" name="empty" />

            <p v-else class="text-center mb-0">{{ props.emptyText }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
