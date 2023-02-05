<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: '_self',
    validator(value) {
      return ['_self', '_blank', '_parent', '_top', 'framename'].includes(value)
    }
  }
})

const attrs = useAttrs()
</script>

<template>
  <router-link v-if="props.to" :to="props.to" :target="props.target" v-bind="attrs">
    <slot />
  </router-link>

  <a v-else :href="props.href" :target="props.target" v-bind="attrs">
    <slot />
  </a>
</template>
