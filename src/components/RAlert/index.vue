<script setup lang="ts">
import { useAttrs, reactive, computed, ref } from 'vue'
import RButton from '../RButton/index.vue'

const $attrs = useAttrs()
const emit = defineEmits<Emits>()

type Props = {
  modelValue?: boolean
  show?: boolean
  dismissible?: boolean
  animation?: string
  type?: 'submit' | 'button' | 'reset'
  variant?: string
  align?: 'left' | 'center' | 'right'
  tag?: 'div' | 'span'
  closeButtonSize?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  dismissible: false,
  type: 'button',
  variant: 'secondary',
  align: 'left',
  tag: 'div',
  closeButtonSize: 'sm'
})

const attrs = reactive({
  role: 'alert',
  ...$attrs
})

const componentClass = [
  'alert',
  {
    'alert-dismissible': props.dismissible,
    [`${props.animation}`]: props.animation,
    [`alert-${props.variant}`]: props.variant,
    [`text-${props.align}`]: props.align,
    [`btn-${props.closeButtonSize}`]: props.closeButtonSize
  },
  'show'
]

interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'update:show', value: any): void
  (e: 'dismissed'): void
}

let showItem = ref(props.show ? true : false)

const show = computed({
  get() {
    return props.modelValue || showItem.value
  },
  set(value) {
    emit('update:modelValue', value)
    showItem.value = false
  }
})

const hide = (): void => {
  if (show.value) show.value = false

  emit('dismissed')
}
</script>

<template>
  <component v-if="show" :is="props.tag" class="mb-1" v-bind="attrs" :class="componentClass">
    <slot />

    <RButton
      v-if="dismissible"
      class="btn-close shadow-none"
      data-bs-dismiss="alert"
      aria-label="Close"
      variant="transparent"
      :size="props.closeButtonSize"
      @click="hide"
    />
  </component>
</template>
