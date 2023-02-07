<script setup lang="ts">
import { useAttrs, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import RLink from '@/components/RLink/index.vue'

type ButtonProps = {
  to?:string | null,
  href?:string | null,
  target?:'_self' | '_blank' | '_parent' | '_top' | 'framename',
  type?: 'submit' | 'button' | 'reset'
  size?:'sm' | 'md' | 'lg',
  variant?: string,
  pill?: boolean,
  squared?: boolean,
  disabled?: boolean,
  block?: boolean,
  tag?: 'div' | 'button' | 'span' | 'a' | 'input'
}

const buttonProps = withDefaults(defineProps<ButtonProps>(), {
  to: null,
  href: null,
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

const $buttonAttrs = useAttrs()

let buttonAttrs = reactive({
  class: [
    'btn',
    `btn-${buttonProps.size}`,
    `btn-${buttonProps.variant}`,
    {
      'rounded-0': buttonProps.squared,
      'rounded-pill': buttonProps.pill,
      disabled: buttonProps.disabled,
      'd-block w-100': buttonProps.block
    }
  ],
  ...$buttonAttrs
})

if (!buttonProps.to && !buttonProps.href) buttonAttrs = Object.assign(buttonAttrs, { type: buttonProps.type })

const router = useRouter()

const buttonClick = (buttonProps: { to: string | null; href: string | null; }) => {
  if (buttonProps.to) router.push(`/${buttonProps.to}`)
  else if (buttonProps.href) router.push(`/${buttonProps.href}`)
}
</script>

<template>
  <RLink v-if="buttonProps.to || buttonProps.href" v-bind="buttonAttrs" :target="buttonProps.target" :to="buttonProps.to" :href="buttonProps.href">
    <slot />
  </RLink>

  <component v-else :is="buttonProps.tag" v-bind="buttonAttrs" :target="buttonProps.target" @click="buttonClick(buttonProps)">
    <slot />
  </component>
</template>
