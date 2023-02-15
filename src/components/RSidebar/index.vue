<script setup>
// const RButton = defineAsyncComponent(() => import('@/components/RButton'))
import RButton from '../RButton/index'

const props = defineProps({
  sidebarId: {
    type: [Number, String],
    required: true
  },
  backdrop: {
    type: [Boolean, String],
    default: true,
    validator(value) {
      return ['static', true, false].includes(value)
    }
  },
  headerText: {
    type: String,
    default: 'Header Text'
  },
  noHeader: {
    type: Boolean,
    default: false
  },
  bgVariant: {
    type: String,
    default: 'light'
  },
  textVariant: {
    type: String,
    default: 'dark'
  },
  shadow: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false
  }
})

const $attrs = useAttrs()

const attrs = {
  ...$attrs,
  role: 'dialog',
  'tab-index': '-1',
  class: [
    'offcanvas',
    `bg-${props.bgVariant}`,
    `text-${props.textVariant}`,
    {
      'offcanvas-start': !props.end,
      'offcanvas-end': props.end,
      shadow: props.shadow
    }
  ]
}
</script>

<template>
  <div v-bind="attrs" :data-bs-backdrop="props.backdrop" tabindex="-1" :id="props.sidebarId">
    <div v-if="!props.noHeader" class="offcanvas-header">
      <h5 class="offcanvas-title">
        <template v-if="props.headerText">
          {{ props.headerText }}
        </template>
        <slot name="sidebar-header" v-else />
      </h5>

      <RButton class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></RButton>
    </div>

    <div class="offcanvas-body">
      <slot />
    </div>
  </div>
</template>
