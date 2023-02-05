<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import type { HTMLAttributes } from 'vue'

type TabProps = {
  active?: boolean
  buttonId?: string
  disabled?: boolean
  id?: string
  lazy?: boolean
  noBody?: boolean
  tag?: string
  title?: string
  titleItemClass?: HTMLAttributes['class']
  titleLinkAttributes?: object
  titleLinkClass?: HTMLAttributes['class']
}

const parentData = inject('tab', null)

const tabProps = withDefaults(defineProps<TabProps>(), {
  active: false,
  disabled: false,
  lazy: false,
  noBody: false,
  tag: 'div'
})

const tabAttrs = computed(() => ({
  id: tabProps.id,
  role: 'tabpanel',
  ariaLabelledby: 'profile-tab'
}))

const lazyRenderCompleted = ref(false)

const lazy = computed<boolean>(() => !!(parentData?.lazy || tabProps.lazy))

const active = computed<boolean>(() => tabProps.active && !tabProps.disabled)

const showSlot = computed<boolean>(() => {
  const hasLazyRenderedOnce = tabProps.lazy && lazyRenderCompleted.value

  return active.value || !tabProps.lazy || hasLazyRenderedOnce
})

const tabClasses = computed(() => [
  'tab-pane',
  {
    active: tabProps.active,
    show: tabProps.active,
    'card-body': parentData?.card && !tabProps.noBody
  }
])

watch(showSlot, (shown) => {
  if (shown && !lazyRenderCompleted.value) lazyRenderCompleted.value = true
})
</script>

<template>
  <component :is="tabProps.tag" v-bind="tabAttrs" :class="tabClasses">
    <slot v-if="showSlot" />
  </component>
</template>
