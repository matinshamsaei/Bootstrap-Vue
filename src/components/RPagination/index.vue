<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const emit = defineEmits(['change'])

type Props = {
  limit?: number | string
  totalRows: number | string
  perPage: number | string
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

const limit = ref(+props.limit)
const totalRows = ref(+props.totalRows)
const perPage = ref(+props.perPage)
const currentPage = ref(+props.currentPage)
const pageNum = Math.ceil(totalRows.value / perPage.value)

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
  const nextPage = currentPage.value + 1
  if (nextPage <= pageNum) update(nextPage)
}

const onClickLastPage = () => {
  update(pageNum)
}

const pages = computed(() => {
  const range = (start: number, end: number) => {
    return Array.from(Array(end - start + 1), (_, i) => i + start)
  }

  const max = limit.value
  const middle = Math.floor(limit.value / 2)
  const pageNum = Math.floor(totalRows.value / perPage.value)

  if (pageNum < max) return range(1, pageNum)

  let start = currentPage.value - middle
  let end = currentPage.value + middle

  if (currentPage.value >= pageNum - middle) {
    start = pageNum - max + 1
    end = pageNum
  }
  return range(Math.max(1, start), Math.max(end, max))
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
