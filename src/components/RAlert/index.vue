<script setup lang="ts">
import { useAttrs, reactive, computed, ref } from 'vue'

type AlertProps = {
  modelValue?: boolean
  show: boolean
  dismissible?: boolean
  animation?: string
  type?: 'submit' | 'button' | 'reset'
  variant?: string
  align?: 'left' | 'center' | 'right'
  tag?: 'div' | 'span'
  closeButtonSize?: 'sm' | 'md' | 'lg'
}

const alertProps = withDefaults(defineProps<AlertProps>(), {
  modelValue: false,
  dismissible: false,
  type: 'button',
  variant: 'secondary',
  align: 'left',
  tag: 'div',
  closeButtonSize: 'sm'
})

const $alertAttrs = useAttrs()

const alertAttrs = reactive({
  role: 'alert',
  ...$alertAttrs
})

const alertClass = [
  'alert',
  `alert-${alertProps.variant}`,
  `text-${alertProps.align}`,
  `btn-${alertProps.closeButtonSize}`,
  {
    'alert-dismissible': alertProps.dismissible,
    [`${alertProps.animation}`]: alertProps.animation
  },
  'show'
]

interface AlertEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'update:show', value: any): void
  (e: 'dismissed'): void
}
const emit = defineEmits<AlertEmits>()

let showItem = ref(alertProps.show ? true : false)

const show = computed({
  get() {
    return alertProps.modelValue || showItem.value
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
  <component v-if="show" :is="alertProps.tag" class="mb-1" v-bind="alertAttrs" :class="alertClass">
    <slot />

    <button
      v-if="dismissible"
      class="btn-close shadow-none"
      aria-label="Close"
      :size="alertProps.closeButtonSize"
      @click="hide"
    />
  </component>
</template>
