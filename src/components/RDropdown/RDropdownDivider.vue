<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <li>
    <hr class="dropdown-divider" v-bind="attrs" />
  </li>
</template>
