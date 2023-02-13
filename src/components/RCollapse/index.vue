<script setup lang="ts">
import type { ObjectHTMLAttributes } from 'vue'
import { useAttrs, reactive, computed, onMounted, ref, watch } from 'vue'

type CollapseProps = {
  modelValue?: boolean
  id?: string | undefined
  visible?: boolean
  accordion?: boolean
  tag?: string
}

const collapseProps = withDefaults(defineProps<CollapseProps>(), {
  modelValue: false,
  id: undefined,
  visible: false,
  accordion: false,
  horizontal: false,
  tag: 'div'
})

const transitioning = ref(false)

function onEnter() {
  transitioning.value = true
}

function onAfterEnter() {
  transitioning.value = false
  isActive.value = true
}

function onLeave() {
  transitioning.value = true
}

function onAfterLeave() {
  isVisible.value = false
  transitioning.value = false
}

const $collapseAttrs = useAttrs()

const collapseAttrs = reactive({
  ...$collapseAttrs
})

interface collapseEmit {
  (e: 'updated:modelValue', val: boolean): void
}

const isActive = ref<boolean>(false)

const collapseEmit = defineEmits<collapseEmit>()

const isVisible = computed({
  get() {
    return collapseProps.modelValue
  },
  set(val) {
    collapseEmit('updated:modelValue', val)
  }
})

const collapseClass = reactive([
  'mb-1',
  {
    'collapse-horizontal': collapseProps.horizontal
  }
])

const height = ref<string | null>('0px')
const collapse = ref<Element | null>(null)
const style: ObjectHTMLAttributes = reactive({})

watch(transitioning, (val) => {
  if (val) {
    height.value = `${collapse.value && collapse.value.scrollHeight}px`
    style.height = height.value
  } else {
    delete style.height
  }
})
</script>

<template>
  <Transition
    name="height"
    mode="out-in"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <component
      ref="collapse"
      v-show="isVisible"
      :is="collapseProps.tag"
      v-bind="collapseAttrs"
      :class="[
        collapseClass,
        { show: isActive && !transitioning, collapse: !transitioning, collapsing: transitioning }
      ]"
      :style="style"
    >
      <slot />
    </component>
  </Transition>
</template>

<style scoped>
.collapsing {
  position: relative;
  transition: height 0.35s ease;
  height: 0;
  overflow: hidden;
}

.height-enter-active,
.height-leave-active {
  transition: height 0.35s ease;
}

.height-enter-from,
.height-leave-to {
  height: 0;
}
</style>
