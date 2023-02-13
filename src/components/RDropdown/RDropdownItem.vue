<script setup lang="ts">
import RLink from '../RLink/index.vue'
import { useAttrs } from 'vue'

type Props = {
  active?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <li>
    <RLink class="dropdown-item" :class="{ active: props.active, disabled: props.disabled }" v-bind="attrs">
      <slot />
    </RLink>
  </li>
</template>
