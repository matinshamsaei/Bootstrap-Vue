<script setup>
import RLink from '../RLink/index.vue';
// import { defineAsyncComponent } from 'vue'
// const RLink = defineAsyncComponent(() => import('@/components/RLink/index.vue'))
import { useAttrs, reactive } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: '_self',
    validator(value) {
      return ['_self', '_blank', '_parent', '_top', 'framename'].includes(value)
    }
  },
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['submit', 'button', 'reset'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  variant: {
    type: String,
    default: 'secondary'
  },
  pill: {
    type: Boolean,
    default: false
  },
  squared: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'button',
    validator(button) {
      return ['div', 'button', 'span', 'a', 'input'].includes(button)
    }
  }
})

const $attrs = useAttrs()

let attrs = reactive({
  ...$attrs,
  class: [
    'btn',
    `btn-${props.size}`,
    `btn-${props.variant}`,
    {
      'rounded-0': props.squared,
      'rounded-pill': props.pill,
      disabled: props.disabled,
      'd-block w-100': props.block
    }
  ]
})

if (!props.to && !props.href) attrs = Object.assign(attrs, { type: props.type })

const router = useRouter()

const buttonClick = (props) => {
  if (props.to) router.push(`/${props.to}`)
  else if (props.href) router.push(`/${props.href}`)
}
</script>

<template>
  <RLink v-if="props.to || props.href" v-bind="attrs" :target="props.target" :to="props.to" :href="props.href">
    <slot />
  </RLink>

  <component v-else :is="props.tag" v-bind="attrs" :target="props.target" @click="buttonClick(props)">
    <slot />
  </component>
</template>
