<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <li>
    <header class="dropdown-header" v-bind="attrs">
      <slot />
    </header>
  </li>
</template>
