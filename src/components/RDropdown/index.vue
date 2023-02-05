<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary'
  },
  text: String,
  size: {
    type: String,
    default: 'md'
  },
  align: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'end'].includes(value)
    }
  },
  dropup: {
    type: Boolean,
    default: false
  },
  dropend: {
    type: Boolean,
    default: false
  },
  dropstart: {
    type: Boolean,
    default: false
  },
  split: {
    type: Boolean,
    default: false
  },
  splitVariant: {
    type: String,
    default: 'secondary'
  },
  toggleClass: {
    type: String,
    default: ''
  },
  noCaret: {
    type: Boolean,
    default: false
  }
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
