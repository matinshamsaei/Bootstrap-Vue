<script setup>
import RLink from '../RLink/index.vue'
import { useAttrs } from 'vue'

const props = defineProps({
  active: Boolean,
  disabled: Boolean
})

const attrs = useAttrs()
</script>

<template>
  <li>
    <RLink class="dropdown-item" :class="{ active: props.active, disabled: props.disabled }" v-bind="attrs">
      <slot />
    </RLink>
  </li>
</template>
