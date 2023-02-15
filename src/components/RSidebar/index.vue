<script setup lang="ts">
import { useAttrs, reactive, computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import RButton from '@/components/RButton/index.vue'

type Props = {
  modelValue?: boolean
  id?: string | number
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

const attrs: HTMLAttributes = reactive({
  ...$attrs,
  role: 'dialog',
  'tab-index': '-1',
  id: String(props.id)
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
  <Transition :name="props.end ? 'left' : 'right'">
    <div>
      <div
        v-bind="attrs"
        :data-bs-backdrop="props.backdrop"
        tabindex="-1"
        :class="[componentClass, { show: show, close: !show }]"
      >
        <div v-if="!props.noHeader" class="offcanvas-header">
          <h5 class="offcanvas-title">
            <template v-if="props.headerText">
              {{ props.headerText }}
            </template>
            <slot name="sidebar-header" v-else />
          </h5>

          <RButton
            @click="hide"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            class="btn-close"
            variant="transparent"
          />
        </div>

        <div class="offcanvas-body">
          <slot />
        </div>
      </div>

      <div v-if="props.backdrop && show" class="offcanvas-backdrop fade show" @click="backDropHide"></div>
    </div>
  </Transition>
</template>
