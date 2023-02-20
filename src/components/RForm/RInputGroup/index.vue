<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  marginBottom?: 0 | 1 | 2 | 3 | 4 | 5 | '0' | '1' | '2' | '3' | '4' | '5'
  prepend?: string
  append?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  marginBottom: 3
})

const slots = useSlots()

const attrs = useAttrs()
</script>

<template>
  <div v-bind="attrs" class="input-group" :class="[`input-group-${props.size}`, `mb-${props.marginBottom}`]">
    <span v-if="props.prepend" class="input-group-text">
      {{ props.prepend }}
    </span>

    <slot name="prepend" v-if="slots.prepend" class="input-group-text" />

    <slot />

    <span v-if="props.append" class="input-group-text">
      {{ props.append }}
    </span>

    <slot name="append" v-if="slots.append" class="input-group-text" />
  </div>
</template>
