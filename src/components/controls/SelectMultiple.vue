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
const toggle = () => {
    if (value.value.length > 0) {
        value.value = []
    } else {
        value.value = props.items.map((v) => (v.id)).slice();
    }
};

const isCheckAll = computed(() => {
    return value.value.length > 0;
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
    <div>
        <v-select class="btn-font" color="primary" variant="outlined" v-model="value" :items="items" :label="label" item-title="nombre" item-value="id" multiple>
            <template v-slot:prepend-item>
                <v-list-item title="Todos" @click="toggle">
                    <template v-slot:prepend>
                        <v-checkbox-btn :model-value="isCheckAll"></v-checkbox-btn>
                    </template>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>
        </v-select>
    </div>
</template>