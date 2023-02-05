<script setup>
import { useAttrs, computed } from 'vue'
import RButton from '../RButton/index.vue'
// const RButton = defineAsyncComponent(() => import('@/components/RButton'))

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  buttonText: {
    type: String,
    default: 'Click button'
  },
  visible: {
    type: Boolean,
    default: false
  },
  accordion: {
    type: Boolean,
    default: false
  },
  horizontal: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'secondary'
  }
})

const collapseId = computed(() => {
  return `#${props.id}`
})

const $attrs = useAttrs()

const attrs = {
  ...$attrs,
  class: [
    'collapse',
    `btn-${props.variant}`,
    'mb-1',
    {
      'collapse-horizontal': props.horizontal,
      show: props.visible
    }
  ]
}

const accordion = {
  'd-block w-100': props.accordion
}
</script>

<template>
  <RButton
    class="mb-1"
    :class="accordion"
    :variant="props.variant"
    :href="collapseId"
    :aria-expanded="props.visible"
    :aria-controls="props.id"
    data-bs-toggle="collapse"
  >
    {{ props.buttonText }}
  </RButton>

  <div :id="props.id" v-bind="attrs">
    <slot />
  </div>
</template>
