<script setup lang="ts">
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router'
import RLink from '@/components/RLink/index.vue'

const attrs = useAttrs()
const router = useRouter()

type Props = {
  to?: string
  href?: string
  target?: '_self' | '_blank' | '_parent' | '_top' | 'framename'
  type?: 'submit' | 'button' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  variant?: string
  pill?: boolean
  squared?: boolean
  disabled?: boolean
  block?: boolean
  tag?: 'div' | 'button' | 'span' | 'a' | 'input'
}

const props = withDefaults(defineProps<Props>(), {
  target: '_self',
  type: 'button',
  size: 'md',
  variant: 'secondary',
  pill: false,
  squared: false,
  disabled: false,
  block: false,
  tag: 'button'
})

const componentClass = [
  'btn',
  {
    'rounded-0': props.squared,
    'rounded-pill': props.pill,
    disabled: props.disabled,
    'd-block w-100': props.block,
    [`btn-${props.size}`]: props.size,
    [`btn-${props.variant}`]: props.variant
  }
]

const clickHandler = (props: Pick<Props, 'to' | 'href'>) => {
  if (props.to) router.push(`/${props.to}`)
  else if (props.href) router.push(`/${props.href}`)
}
</script>

<template>
  <RLink
    v-if="props.to || props.href"
    v-bind="attrs"
    :class="componentClass"
    :target="props.target"
    :type="props.type"
    :to="props.to"
    :href="props.href"
  >
    <slot />
  </RLink>

  <component
    v-else
    v-bind="attrs"
    :is="props.tag"
    :type="props.type"
    :target="props.target"
    :class="componentClass"
    @click="clickHandler(props)"
  >
    <slot />
  </component>
</template>
