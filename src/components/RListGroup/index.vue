<script setup lang="ts">
import { useAttrs, reactive } from 'vue'

const $attrs = useAttrs()

const attrs = reactive({
  ...$attrs
})

type Props = {
  flush?: boolean
  numbered?: boolean
  horizontal?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean
}

const props = withDefaults(defineProps<Props>(), {
  flush: false,
  numbered: false,
  horizontal: false
})

const componentClass = [
  'list-group ',
  {
    'list-group-flush': props.flush,
    [typeof props.horizontal === 'string' && props.horizontal.length
      ? `list-group-horizontal-${props.horizontal}`
      : 'list-group-horizontal']: props.horizontal || (typeof props.horizontal === 'string' && !props.horizontal)
  }
]
</script>

<template>
  <ol v-if="props.numbered" v-bind="attrs" class="list-group-numbered" :class="componentClass">
    <slot />
  </ol>

  <ul v-else v-bind="attrs" :class="componentClass">
    <slot />
  </ul>
</template>
