<script setup lang="ts">
import { useAttrs } from 'vue'

export interface Props {
  to?: string
  href?: string
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
}

const props = withDefaults(defineProps<Props>(), {
  target: '_self'
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
