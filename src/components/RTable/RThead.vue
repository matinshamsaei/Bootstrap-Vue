<script setup lang="ts">
import { reactive, onMounted, type HTMLAttributes } from 'vue'
import type { Props as TableProps } from './index.vue'

type Props = {
  tableProps: TableProps
}

const props = defineProps<Props>()
const { fields, items, sortBy, sortDesc } = props.tableProps

const emit = defineEmits(['sort'])

type Field = {
  key?: string
  label?: string
  sortable?: boolean
  sortType?: string
  class?: string
  thStyle?: string
  style?: string
  classes?: HTMLAttributes['class']
}

let tableHeaderItems: Field[] = reactive([])

renderTableHeaders()

function renderTableHeaders() {
  if (fields && fields.length) tableHeaderItems.push(...fieldsCompleter())
  else tableHeaderItems.push(...keysCompleter())
}

function fieldsCompleter(): Field[] {
  if (fields?.length && typeof fields[0] === 'string')
    return fields.map((field: any) => {
      const sampleItem = {
        key: field,
        label: undefined,
        sortable: false,
        sortType: 'none',
        classes: '',
        style: ''
      }
      return sampleItem
    })
  else if (fields?.length)
    return fields.map((field: Field) => {
      const sampleItem = {
        key: field.key,
        label: field.label,
        sortable: field.sortable ? field.sortable : false,
        sortType: 'none',
        classes: classRender(field),
        style: field.thStyle
      }
      return sampleItem
    })
  return []
}

function classRender(field: Field): object {
  if (field.key === sortBy) return { sortable: true, [`${field.class}`]: field.class }
  else return { sortable: field.sortable, [`${field.class}`]: field.class }
}

function keysCompleter(): Field[] {
  const HeaderItemsKey = items?.length ? Object.keys(items[0]) : []
  return HeaderItemsKey.map((item) => {
    const sampleItem = {
      key: item,
      sortable: false,
      sortType: 'none'
    }
    return sampleItem
  })
}

const tableHeaderNormalizer = (item: Field) => {
  return item.label === undefined ? item.key?.replace('_', ' ') : item.label
}

function toggleSort(item: Field) {
  if (!props.tableProps.busy && item.sortable) {
    if (item.sortType === 'none') {
      resetSortClasses()
      item.sortType = 'asc'
    } else if (item.sortType === 'asc') {
      resetSortClasses()
      item.sortType = 'desc'
    } else {
      resetSortClasses()
      item.sortType = 'none'
    }

    emit('sort', item)
  }
}

function resetSortClasses() {
  tableHeaderItems.forEach((item: Field) => (item.sortType = 'none'))
}

onMounted(() => {
  if (sortBy && checkIdExistence()) {
    const itemSelected = tableHeaderItems.find((item: Field) => item.key === sortBy)
    if (itemSelected) {
      if (sortDesc) itemSelected.sortType = 'desc'
      else itemSelected.sortType = 'asc'
    }
    emit('sort', itemSelected)
  }
})

function checkIdExistence() {
  if (fields?.length && typeof fields[0] === 'string') return (fields as any[]).find((field: string) => field === 'id')
  return (fields as any[])?.find((field: Field) => field.key === 'id')
}
</script>

<template>
  <thead>
    <tr v-if="fields?.length">
      <th
        v-for="item in tableHeaderItems"
        :style="item.style"
        :class="[item.classes, `sortable-${item.sortType}`]"
        @click="toggleSort(item)"
      >
        {{ tableHeaderNormalizer(item) }}
      </th>
    </tr>

    <tr v-else>
      <th
        v-for="item in tableHeaderItems"
        :class="[item.classes, `sortable-${item.sortType}`]"
        :style="item.style"
        @click="toggleSort(item)"
      >
        {{ tableHeaderNormalizer(item) }}
      </th>
    </tr>
  </thead>
</template>
