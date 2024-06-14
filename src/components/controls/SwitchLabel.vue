<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

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
    <v-switch v-model="value" :disabled="disabled" :label="label" color="primary" inset hide-details></v-switch>
</template>