<script setup>
import { computed, ref, useAttrs } from 'vue'

const props = defineProps({
  limit: {
    type: [Number, String],
    default: 3
  },
  totalRows: {
    type: [Number, String],
    required: true
  },
  perPage: {
    type: [Number, String],
    required: true
  },
  currentPage: {
    type: [Number, String],
    default: 1
  },
  size: {
    type: String,
    default: 'sm',
    validator(value) {
      return ['sm', 'lg'].includes(value)
    }
  },
  pill: {
    type: Boolean,
    default: false
  },
  startText: {
    type: String,
    default: 'First'
  },
  prevText: {
    type: String,
    default: 'Prev'
  },
  nextText: {
    type: String,
    default: 'Next'
  },
  lastText: {
    type: String,
    default: 'Last'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  hideGoToEndButtons: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'center',
    validator(value) {
      return ['start', 'end', 'center', 'between', 'around'].includes(value)
    }
  }
})

const limit = ref(+props.limit)
const totalRows = ref(+props.totalRows)
const perPage = ref(+props.perPage)
const currentPage = ref(+props.currentPage)
const pageNum = Math.ceil(totalRows.value / perPage.value)

const $attrs = useAttrs()

const attrs = {
  ...$attrs,
  class: [`pagination-${props.size}`]
}

const rounded = {
  'rounded-pill me-1 px-3': props.pill
}

const emit = defineEmits(['change'])

const update = (amount) => {
  emit('change', amount)
  updateCurrentPage(amount)
}

const updateCurrentPage = (amount) => {
  currentPage.value = amount
}

const onClickStartPage = () => {
  update(1)
}

const isActivePage = (page) => {
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
  const range = (start, end) => {
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
    <ul v-bind="attrs" class="pagination" :class="`justify-content-${props.align}`">
      <li v-if="!props.hideGoToEndButtons" class="page-item">
        <button type="button" :disabled="isStartPage" class="page-link" @click="onClickStartPage" :class="rounded">
          {{ props.startText }}
        </button>
      </li>

      <li v-if="!props.hideEllipsis" class="page-item">
        <button type="button" :disabled="isStartPage" class="page-link" @click="onClickPreviousPage" :class="rounded">
          {{ props.prevText }}
        </button>
      </li>

      <li v-for="page in pages" :key="page" class="page-item">
        <button
          type="button"
          class="page-link"
          :disabled="page.isDisabled"
          :class="[{ active: isActivePage(page) }, rounded]"
          @click="update(page)"
        >
          {{ page }}
        </button>
      </li>

      <li v-if="!props.hideEllipsis" class="page-item">
        <button type="button" :disabled="isLastPage" class="page-link" @click="onClickNextPage" :class="rounded">
          {{ props.nextText }}
        </button>
      </li>

      <li v-if="!props.hideGoToEndButtons" class="page-item">
        <button type="button" @click="onClickLastPage" :disabled="isLastPage" class="page-link" :class="rounded">
          {{ props.lastText }}
        </button>
      </li>
    </ul>
  </nav>
</template>
