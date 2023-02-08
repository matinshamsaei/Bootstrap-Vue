<script setup lang="ts">
import { useAttrs, reactive } from 'vue'
import RLink from '@/components/RLink/index.vue'
// import { defineAsyncComponent } from 'vue'
// const RLink = defineAsyncComponent(() => import('../RLink/index.vue'))

type BadgeProps = {
  variant?: string
  tag?: 'span' | 'a'
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
  pill?: boolean
  to?: string | null
  href?: string | null
}

const badgeProps = withDefaults(defineProps<BadgeProps>(), {
  variant: 'success',
  tag: 'span',
  target: '_self',
  pill: false,
  to: null,
  href: null
})

const $badgeAttrs = useAttrs()

const badgeAttrs = reactive({
  ...$badgeAttrs
})

const badgeClass = [
  'badge',
  `text-bg-${badgeProps.variant}`,
  {
    'rounded-pill': badgeProps.pill
  }
]
</script>

<template>
  <RLink
    v-if="badgeProps.to || badgeProps.href"
    v-bind="badgeAttrs"
    :target="badgeProps.target"
    :to="badgeProps.to"
    :href="badgeProps.href"
    :class="badgeClass"
    class="text-decoration-none"
  >
    <slot />
  </RLink>

  <component v-else :is="badgeProps.tag" v-bind="badgeAttrs" :target="badgeProps.target" :class="badgeClass">
    <slot />
  </component>
</template>
