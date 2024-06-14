<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
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
})

const emit = defineEmits(['update:modelValue', 'blur', 'input'])
const onBlur = () => { emit('blur') }
const onInput = () => { emit('input') }

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
    <v-textarea class="btn-font" color="primary" :label="label" v-model="value" :error-messages="errorMessages"
    :required="isRequired" @input="onInput" @blur="onBlur"
    variant="outlined"></v-textarea>
</template>