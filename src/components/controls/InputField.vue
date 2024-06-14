<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
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
    prefix: {
        type: String,
        default: ''
    }
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
    <v-text-field :prefix="prefix" class="btn-font" color="primary" :type="type" :prepend-inner-icon="icon" variant="outlined"
        v-model="value" :error-messages="errorMessages" :label="label" @input="onInput" @blur="onBlur"
        :required="isRequired"></v-text-field>
</template>