<script setup lang="ts">
import { useAttrs } from 'vue'

type Props = {
  variant?: string
  text?: string
  size?: string
  align?: 'start' | 'end'
  dropup?: boolean
  dropend?: boolean
  dropstart?: boolean
  split?: boolean
  splitVariant?: string
  toggleClass?: string
  noCaret?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  align: 'start',
  dropup: false,
  dropend: false,
  dropstart: false,
  split: false,
  splitVariant: 'secondary',
  toggleClass: '',
  noCaret: false
})

const alignClass = props.align && `dropdown-menu-${props.align}`

const attrs = useAttrs()
</script>

<template>
  <div
    class="dropdown"
    :class="[
      { 'btn-group': props.split },
      { dropup: props.dropup },
      { dropend: props.dropend },
      { dropstart: props.dropstart }
    ]"
    v-bind="attrs"
  >
    <button
      v-if="props.split"
      type="button"
      class="btn"
      :class="[props.toggleClass, `btn-${props.splitVariant}`, `btn-${props.size}`]"
    >
      <slot name="button-content" v-if="!props.text" />
      {{ props.text }}
    </button>

    <button
      class="btn dropdown-toggle"
      :class="[
        props.toggleClass,
        `btn-${props.variant}`,
        `btn-${props.size}`,
        { 'dropdown-toggle-split': props.split },
        { 'no-caret': props.noCaret }
      ]"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <template v-if="!props.split">
        <slot name="button-content" v-if="!props.text" />
        {{ props.text }}
      </template>
    </button>
    <ul class="dropdown-menu" :class="alignClass">
      <slot />
    </ul>
  </div>
</template>
