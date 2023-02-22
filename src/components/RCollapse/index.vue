<script setup lang="ts">
import { useAttrs, reactive, computed, watch, ref, onMounted } from 'vue'
import { Collapse } from 'bootstrap'

const attrs = useAttrs()

const emit = defineEmits<emit>()

interface emit {
  (e: 'updated:modelValue', val: boolean): void
}

const element = ref<Element>()

const instance = ref<Collapse>()

onMounted(() => {
  instance.value = new Collapse(element.value as HTMLElement, {
    parent: props.accordion ? `#${props.accordion}` : undefined,
    toggle: props.toggle
  })
})

type Props = {
  id: string | undefined
  modelValue?: boolean
  visible?: boolean
  accordion?: boolean
  tag?: string
  toggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  modelValue: false,
  visible: false,
  accordion: false,
  horizontal: false,
  toggle: false,
  tag: 'div'
})

const show = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('updated:modelValue', val)
  }
})

watch(
  () => show.value,
  (val) => {
    if (val) instance.value?.show()
    else instance.value?.hide()
  }
)

const componentClass = reactive([
  'collapse',
  'mb-1',
  {
    'collapse-horizontal': props.horizontal,
    show: props.visible
  }
])
</script>

<template>
  <component ref="element" :is="props.tag" :id="props.id" v-bind="attrs" :class="componentClass">
    <slot />
  </component>
</template>
