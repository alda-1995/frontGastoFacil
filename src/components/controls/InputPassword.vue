<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

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
    icon: {
        type: String,
        default: ''
    },
})

const showIcon = ref(false);

const clickIcon = () => { showIcon.value = !showIcon.value; };

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
    <v-text-field color="primary"
    :append-inner-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="clickIcon"
    :type="showIcon ? 'text' : 'password'" :prepend-inner-icon="icon"
    variant="outlined" v-model="value" :error-messages="errorMessages" :label="label"
        :required="isRequired" @input="onInput" @blur="onBlur"></v-text-field>
</template>