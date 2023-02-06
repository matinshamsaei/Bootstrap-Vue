<script setup>
import RButton from '../RButton/index.vue';
// import { defineAsyncComponent } from 'vue'
// const RButton = defineAsyncComponent(() => import('../RButton/index.vue'))

const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number]
  },
  show: {
    type: [Boolean, String, Number]
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  animation: {
    type: String
  },
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['submit', 'button', 'reset'].includes(value)
    }
  },
  variant: {
    type: String,
    default: 'secondary'
  },
  align: {
    type: String,
    default: 'left',
    validator(align) {
      return ['left', 'center', 'right'].includes(align)
    }
  },
  tag: {
    type: String,
    default: 'div',
    validator(tag) {
      return ['div', 'span'].includes(tag)
    }
  },
  closeButtonSize: {
    type: String,
    default: 'sm',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  }
})

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs,
  role: 'alert'
})

const classes = [
  'alert',
  `alert-${props.variant}`,
  `text-${props.align}`,
  `btn-${props.closeButtonSize}`,
  {
    'alert-dismissible': props.dismissible,
    [props.animation]: props.animation
  },
  'show'
]

const emit = defineEmits(['update:modelValue', 'dismissed'])

const show = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const hide = () => {
  if (show.value) show.value = false

  emit('dismissed')
}
</script>

<template>
  <component :is="props.tag" class="mb-1" v-bind="attrs" :class="classes">
    <slot />

    <R-Button
      v-if="dismissible"
      class="btn-close close shadow-none"
      data-bs-dismiss="alert"
      aria-label="Close"
      variant="transparent"
      :size="props.closeButtonSize"
      @click="hide"
    />
  </component>
</template>
