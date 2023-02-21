<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <li>
    <span class="dropdown-item-text" v-bind="attrs">
      <slot />
    </span>
  </li>
</template>
