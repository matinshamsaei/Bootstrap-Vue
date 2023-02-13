<script setup lang="ts">
import { useAttrs, reactive } from 'vue'

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs
})

type Props = {
  active?: boolean
  disabled?: boolean
  variant?: string | null
  href?: string | null
  tag?: 'li' | 'div' | 'span' | 'a'
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
  variant: null,
  href: null,
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
  <component
    :is="props.tag"
    :variant="props.variant"
    :href="props.href"
    v-bind="attrs"
    :class="[{ active: props.active, disabled: props.disabled }, componentClass]"
  >
    <slot />
  </component>
</template>
