<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div v-bind="attrs" class="input-group-text">
    <slot />
  </div>
</template>
