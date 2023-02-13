<script setup>
const props = defineProps(['tableProps'])
const { fields, items, headVariant, cellVariant, rowVariant, sortBy, sortDesc } = props.tableProps

let tableHeaderItems = reactive([])

renderTableHeaders()

function renderTableHeaders() {
  if (fields.length) tableHeaderItems.push(...fieldsCompleter())
  else tableHeaderItems.push(...keysCompleter())
}

function fieldsCompleter() {
  return props.tableProps.fields.map((field) => {
    const sampleItem = {
      key: field.key,
      label: field.label,
      sortable: field.sortable ? field.sortable : false,
      sortType: 'none',
      classes: { sortable: field.sortable, [field.class]: field.class, [`table-${cellVariant}`]: cellVariant },
      style: field.thStyle
    }
    return sampleItem
  })
}

function keysCompleter() {
  const HeaderItemsKey = Object.keys(items[0])
  HeaderItemsKey.map((item) => {
    const sampleItem = {
      key: item,
      sortable: false,
      sortType: 'none',
      classes: { [`table-${cellVariant}`]: cellVariant }
    }
    return sampleItem
  })
}

const emit = defineEmits(['sort'])

const tableHeaderNormalizer = (item) => {
  if (typeof item === 'string') return item.replace('_', ' ')
  return item.label === undefined ? item.key.replace('_', ' ') : item.label
}

const headClasses = {
  [`table-${headVariant}`]: headVariant
}

const rowClasses = {
  [`table-${rowVariant}`]: rowVariant
}

function toggleSort(item) {
  if (item.sortable) {
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
  tableHeaderItems.forEach((item) => (item.sortType = 'none'))
}

onMounted(() => {
  if (sortBy && checkIdExistence()) {
    const itemSelected = tableHeaderItems.find((item) => item.key === sortBy)
    if (sortDesc) itemSelected.sortType = 'desc'
    else itemSelected.sortType = 'asc'
    emit('sort', itemSelected)
  }
})

function checkIdExistence() {
  return fields.find((field) => field.key === 'id')
}
</script>

<template>
  <thead :class="headClasses">
    <tr v-if="fields.length" :class="rowClasses">
      <th
        v-for="item in tableHeaderItems"
        :style="item.style"
        :class="[item.classes, `sortable-${item.sortType}`]"
        @click="toggleSort(item)"
      >
        {{ tableHeaderNormalizer(item) }}
      </th>
    </tr>

    <tr v-else :class="rowClasses">
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
