<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div v-bind="attrs" class="input-group-text">
    <slot />
  </div>
</template>
