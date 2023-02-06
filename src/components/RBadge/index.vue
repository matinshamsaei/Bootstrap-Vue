<script setup>
import RLink from '../RLink/index.vue';
// import { defineAsyncComponent } from 'vue'
// const RLink = defineAsyncComponent(() => import('../RLink/index.vue'))

const props = defineProps({
  variant: {
    type: String,
    default: 'success'
  },
  tag: {
    type: String,
    default: 'span',
    validator(button) {
      return ['span', 'a'].includes(button)
    }
  },
  target: {
    type: String,
    default: '_self',
    validator(value) {
      return ['_self', '_blank', '_parent', '_top', 'framename'].includes(value)
    }
  },
  pill: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  }
})

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs,
  class: [
    'badge',
    `text-bg-${props.variant}`,
    {
      'rounded-pill': props.pill
    }
  ]
})
</script>

<template>
  <r-link
    v-if="props.to || props.href"
    v-bind="attrs"
    :target="props.target"
    :to="props.to"
    :href="props.href"
    class="text-decoration-none"
  >
    <slot />
  </r-link>

  <component v-else :is="props.tag" v-bind="attrs" :target="props.target">
    <slot />
  </component>
</template>
