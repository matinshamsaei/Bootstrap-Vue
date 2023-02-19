<script setup lang="ts">
import { reactive } from 'vue'
import RFormCheckbox from '@/components/RForm/RFormCheckbox/RFormCheckbox.vue'
import RFormCheckboxGroup from '@/components/RForm/RFormCheckbox/RFormCheckboxGroup.vue'

const checkbox = reactive({
  values: [],
  options: [
    { text: 'test1', value: 'test-1', disabled: true },
    { text: 'test2', value: 'test-2' },
    { text: 'test3', value: 'test-3' }
  ]
})
</script>

<template>
  <div class="container mt-3">
    <r-form-checkbox-group v-model="checkbox.values" :options="checkbox.options" label="test label" />
    {{ checkbox.values }}
  </div>
</template>
