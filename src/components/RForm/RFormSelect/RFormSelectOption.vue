<script setup lang="ts">
import { useAttrs } from 'vue'

type Props = {
  value: string | number | boolean | null
}

const props = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
  <option :value="props.value" v-bind="attrs">
    <slot />
  </option>
</template>
