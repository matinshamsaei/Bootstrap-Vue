<script setup lang="ts">
import { useAttrs } from 'vue'
import RLink from '@/components/RLink/index.vue'
// import { defineAsyncComponent } from 'vue'
// const RLink = defineAsyncComponent(() => import('../RLink/index.vue'))

const attrs = useAttrs()

type Props = {
  variant?: string
  tag?: 'span' | 'a'
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
  pill?: boolean
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  tag: 'span',
  target: '_self',
  pill: false
})

const componentClass = [
  'badge',
  {
    [`text-bg-${props.variant}`]: props.variant,
    'rounded-pill': props.pill
  }
]
</script>

<template>
  <RLink
    v-if="props.to || props.href"
    v-bind="attrs"
    :target="props.target"
    :to="props.to"
    :href="props.href"
    :class="componentClass"
    class="text-decoration-none"
  >
    <slot />
  </RLink>

  <component v-else :is="props.tag" v-bind="attrs" :target="props.target" :class="componentClass">
    <slot />
  </component>
</template>
