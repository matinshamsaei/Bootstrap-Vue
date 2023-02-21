<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const emit = defineEmits(['change'])

type Props = {
  totalRows: number | string
  perPage: number | string
  limit?: number | string // limit to visible page buttons
  currentPage?: number | string
  size?: 'sm' | 'lg'
  pill?: boolean
  startText?: string
  prevText?: string
  nextText?: string
  lastText?: string
  hideEllipsis?: boolean
  hideGoToEndButtons?: boolean
  align?: 'start' | 'end' | 'center' | 'between' | 'around'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  currentPage: 1,
  size: 'sm',
  pill: false,
  startText: 'First',
  prevText: 'Prev',
  nextText: 'Next',
  lastText: 'Last',
  hideEllipsis: false,
  hideGoToEndButtons: false,
  align: 'center',
  disabled: false
})

const componentClass = [`pagination-${props.size}`]

const roundedClass = {
  'rounded-pill me-1 px-3': props.pill
}

const buttonsLimit = ref<number>(+props.limit)
const totalRows = ref<number>(+props.totalRows)
const perPage = ref<number>(+props.perPage)
const currentPage = ref<number>(+props.currentPage)
const totalPages = Math.ceil(totalRows.value / perPage.value)
const limit = buttonsLimit.value
const middle = Math.floor(buttonsLimit.value / 2)

const update = (amount: number) => {
  emit('change', amount)
  updateCurrentPage(amount)
}

const updateCurrentPage = (amount: number) => {
  currentPage.value = amount
}

const onClickStartPage = () => {
  update(1)
}

const isActivePage = (page: number) => {
  return currentPage.value === page
}

const onClickPreviousPage = () => {
  if (currentPage.value - 1 >= 1) update(currentPage.value - 1)
}

const onClickNextPage = () => {
  if (currentPage.value + 1 <= totalPages) update(currentPage.value + 1)
}

const onClickLastPage = () => {
  update(totalPages)
}

const range = (start: number, end: number) => {
  if (buttonsLimit.value % 2 === 0) return Array.from(Array(buttonsLimit.value), (_, i) => i + start)
  return Array.from(Array(end - start + 1), (_, i) => i + start)
}

const getPages = () => {
  if (totalPages < limit) return range(1, totalPages)

  let start = currentPage.value - middle
  let end = currentPage.value + middle

  if (currentPage.value >= totalPages - middle) {
    start = totalPages - limit + 1
    end = totalPages
  }
  return range(Math.max(1, start), Math.max(end, limit))
}

const pages = computed(() => {
  return getPages()
})

const isStartPage = computed(() => {
  return currentPage.value === 1
})

const isLastPage = computed(() => {
  return currentPage.value === totalRows.value
})
</script>

<template>
  <nav>
    <ul v-bind="attrs" class="pagination" :class="[`justify-content-${props.align}`, componentClass]">
      <li v-if="!props.hideGoToEndButtons" class="page-item">
        <button
          type="button"
          :disabled="isStartPage || disabled"
          class="page-link"
          @click="onClickStartPage"
          :class="roundedClass"
        >
          {{ props.startText }}
        </button>
      </li>

      <li v-if="!props.hideEllipsis" class="page-item">
        <button
          type="button"
          :disabled="isStartPage || disabled"
          class="page-link"
          @click="onClickPreviousPage"
          :class="roundedClass"
        >
          {{ props.prevText }}
        </button>
      </li>

      <li v-for="page in pages" :key="page" class="page-item">
        <button
          type="button"
          class="page-link"
          :disabled="disabled"
          :class="[{ active: isActivePage(page) }, roundedClass]"
          @click="update(page)"
        >
          {{ page }}
        </button>
      </li>

      <li v-if="!props.hideEllipsis" class="page-item">
        <button
          type="button"
          :disabled="isLastPage || disabled"
          class="page-link"
          @click="onClickNextPage"
          :class="roundedClass"
        >
          {{ props.nextText }}
        </button>
      </li>

      <li v-if="!props.hideGoToEndButtons" class="page-item">
        <button
          type="button"
          @click="onClickLastPage"
          :disabled="isLastPage || disabled"
          class="page-link"
          :class="roundedClass"
        >
          {{ props.lastText }}
        </button>
      </li>
    </ul>
  </nav>
</template>
