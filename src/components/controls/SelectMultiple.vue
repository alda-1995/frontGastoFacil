<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [Array],
        default: () => [],
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
    <div>
        <v-select class="font-button" color="primary" variant="outlined" v-model="value" :items="items" :label="label" item-title="nombre" item-value="value" multiple>
        </v-select>
    </div>
</template>