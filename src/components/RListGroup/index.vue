<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  flush: {
    type: Boolean,
    default: false
  },
  numbered: {
    type: Boolean,
    default: false
  },
  horizontal: {
    type: [Boolean, String],
    default: false,
    validator(value) {
      return ['sm', 'md', 'lg', 'xl', 'xxl', true, false]
    }
  }
})

const $attrs = useAttrs()

const attrs = {
  ...$attrs,
  class: [
    'list-group ',
    {
      'list-group-flush': props.flush,
      [typeof props.horizontal === 'string' ? `list-group-horizontal-${props.horizontal}` : 'list-group-horizontal']:
        !!props.horizontal
    }
  ]
}
</script>

<template>
  <div>
    <ol v-if="props.numbered" v-bind="attrs" class="list-group-numbered">
      <slot />
    </ol>

    <ul v-else v-bind="attrs">
      <slot />
    </ul>
  </div>
</template>
