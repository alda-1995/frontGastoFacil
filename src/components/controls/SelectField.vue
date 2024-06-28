<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    icon: {
        type: String,
        default: ''
    },
    items: {
        type: Array,
        default: () => [],
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: 'Label',
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    titleSelect: {
        type: String,
        default: 'name',
    },
    valueSelect: {
        type: String,
        default: 'value',
    },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<template>
    <v-select class="btn-font" color="primary" variant="outlined" v-model="value"
    :item-title="titleSelect" :item-value="valueSelect" clearable
    :items="items" :label="label" :error-messages="errorMessages" :required="isRequired"></v-select>
</template>