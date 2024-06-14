<!-- <script setup>
import { ErrorsMessage } from '@/components/displays/common';
import { defineProps, defineEmits, computed } from 'vue'
import { es } from 'date-fns/locale';

const props = defineProps({
    modelValue: {
        type: Date,
        default: null,
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: 'Label'
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
    <VueDatePicker class="input-date btn-font"
    :required="isRequired" format="dd-MM-yyyy" :format-locale="es"
    @input="onInput" @blur="onBlur" v-model="value"></VueDatePicker>
    <errors-message :errors="errorMessages" />
</template> -->