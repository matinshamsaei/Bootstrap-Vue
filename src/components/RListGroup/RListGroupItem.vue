<script setup lang="ts">
import RLink from '@/components/RLink/index.vue';
import { useAttrs } from 'vue'

const attrs = useAttrs()

type Props = {
  active?: boolean
  disabled?: boolean
  variant?: string | null
  href?: string | null
  to?: string | null
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
  tag?: 'li' | 'div' | 'span' | 'a'
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
  variant: null,
  href: null,
  target: '_self',
  to: null,
  tag: 'li'
})

const componentClass = [
  'list-group-item',
  `list-group-item-${props.variant}`,
  {
    disabled: props.disabled,
    active: props.active
  }
]
</script>

<template>
  <RLink
    v-if="props.to || props.href"
    v-bind="attrs"
    :class="componentClass"
    :target="props.target"
    :to="props.to"
    :href="props.href"
  >
    <slot />
  </RLink>

  <component
    v-else
    :is="props.tag"
    :variant="props.variant"
    :href="props.href"
    v-bind="attrs"
    :class="[{ active: props.active, disabled: props.disabled }, componentClass]"
  >
    <slot />
  </component>
</template>
