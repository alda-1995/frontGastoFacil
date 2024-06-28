<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Date,
        default: null,
    },
    label: {
        type: String,
        default: 'Label'
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: "dd-MM-yyyy"
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
    <VueDatePicker class="input-date font-button"
    :required="isRequired" :format="format"
    @input="onInput" @blur="onBlur" v-model="value"></VueDatePicker>
</template>