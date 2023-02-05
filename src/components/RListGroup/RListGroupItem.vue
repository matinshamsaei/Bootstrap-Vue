<script setup>
import { useAttrs, reactive } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'li',
    validator(tag) {
      return ['li', 'div', 'span', 'a'].includes(tag)
    }
  }
})

const $attrs = useAttrs()

let attrs = reactive({
  ...$attrs,
  class: [
    'list-group-item',
    `list-group-item-${props.variant}`,
    {
      disabled: props.disabled,
      active: props.active
    }
  ]
})
</script>

<template>
  <component
    :is="props.tag"
    :variant="props.variant"
    :href="props.href"
    v-bind="attrs"
    :class="{ active: props.active, disabled: props.disabled }"
  >
    <slot />
  </component>
</template>
