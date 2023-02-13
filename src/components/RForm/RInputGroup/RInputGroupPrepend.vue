<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()

type Props = {
  isText: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isText: false
})
</script>

<template>
  <span v-if="props.isText" v-bind="attrs" class="input-group-text">
    <slot />
  </span>

  <slot v-else v-bind="attrs" class="input-group-text" />
</template>
