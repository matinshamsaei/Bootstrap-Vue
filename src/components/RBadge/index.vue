<script setup lang="ts">
import { useAttrs, reactive } from 'vue'
import RLink from '@/components/RLink/index.vue'
// import { defineAsyncComponent } from 'vue'
// const RLink = defineAsyncComponent(() => import('../RLink/index.vue'))

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs
})

type Props = {
  variant?: string
  tag?: 'span' | 'a'
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
  pill?: boolean
  to?: string | null
  href?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  tag: 'span',
  target: '_self',
  pill: false,
  to: null,
  href: null
})

const componentClass = [
  'badge',
  `text-bg-${props.variant}`,
  {
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
