<script setup lang="ts">
import { useAttrs, reactive, computed } from 'vue'
import RButton from '@/components/RButton/index.vue'

type Props = {
  modelValue?: boolean
  sidebarId: string | number
  backdrop?: 'static' | boolean
  headerText?: string
  noHeader?: boolean
  bgVariant?: string
  textVariant?: string
  shadow?: boolean
  end?: boolean
  noCloseOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  backdrop: true,
  headerText: 'Header Text',
  noHeader: false,
  bgVariant: 'light',
  textVariant: 'dark',
  shadow: false,
  end: false,
  noCloseOnBackdrop: false
})

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs,
  role: 'dialog',
  'tab-index': '-1'
})

interface Emit {
  (e: 'update:modelValue', val: boolean): void
}

const emit = defineEmits<Emit>()

const show = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const hide = () => {
  show.value = false
}

const backDropHide = () => {
  if (!props.noCloseOnBackdrop) hide()
}

const componentClass = [
  'offcanvas',
  `bg-${props.bgVariant}`,
  `text-${props.textVariant}`,
  {
    'offcanvas-start': !props.end,
    'offcanvas-end': props.end,
    shadow: props.shadow
  }
]
</script>

<template>
  <Transition name="left">
    <div>
      <div
        v-bind="attrs"
        :data-bs-backdrop="props.backdrop"
        tabindex="-1"
        :id="`${props.sidebarId}`"
        :class="[componentClass, { show: show, close: !show }]"
      >
        <div v-if="!props.noHeader" class="offcanvas-header">
          <h5 class="offcanvas-title">
            <template v-if="props.headerText">
              {{ props.headerText }}
            </template>
            <slot name="sidebar-header" v-else />
          </h5>

          <RButton class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="hide"></RButton>
        </div>

        <div class="offcanvas-body">
          <slot />
        </div>
      </div>

      <div v-if="props.backdrop && show" class="offcanvas-backdrop fade show" @click="backDropHide"></div>
    </div>
  </Transition>
</template>

<style scoped>
.left-enter-active,
.left-leave-active {
  transition: all 0.5s linear !important;
  left: 0px !important;
  overflow: hidden !important;
}

.left-enter-from,
.left-leave-to {
  left: -400px !important;
}

.close {
  transition: all 0.5s linear !important;
  left: -400px !important;
}
.offcanvas-backdrop.show {
  opacity: 0.5;
}

.fade {
  transition: opacity 0.15s linear;
}
</style>
