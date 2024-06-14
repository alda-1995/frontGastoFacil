<script setup>
import { InputField, SelectField } from '@/components/controls/common'
import { defineProps, ref, defineEmits } from 'vue'

const listItems = ref([])
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    idField: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "mdi-plus",
    },
    listFields: {
        type: Array,
        default: () => [],
        required: true
    },
})

const emit = defineEmits(['update:modelValue'])
const addItem = () => {
    const newItem = {};
    props.listFields.forEach(field => {
        newItem[field.name] = '';
    });
    listItems.value = [...listItems.value, newItem];
    emit('update:modelValue', listItems.value)
};

const deleteItem = (index) => {
    listItems.value.splice(index, 1);
    emit('update:modelValue', listItems.value)
};
</script>
<template>
    <div class="d-flex flex-column align-start">
        <div class="w-100 mb-8" v-show="listItems.length > 0">
            <v-row v-for="(item, index) in listItems" :key="idField + index">
                <v-col cols="12" sm="10">
                    <v-row>
                        <v-col cols="12" :md="props.listFields.length == 1 ? 12 : 6" v-for="field in props.listFields"
                            :key="field.label">
                            <div class="d-flex">
                                <template v-if="field.type === 'select'">
                                    <select-field :label="field.label" :items="field.list" 
                                    :is-required="field.required" v-model="item[field.name]" />
                                </template>
                                <template v-else>
                                    <input-field :label="field.label" v-model="item[field.name]" :type="field.type"
                                        :is-required="field.required" />
                                </template>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="2">
                    <div class="flex-shrink-0 ml-2 icon-container d-flex align-center">
                        <v-icon icon="mdi-delete-outline" @click="deleteItem(index)"></v-icon>
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-sheet class="d-inline-flex px-4 py-2 bg-info text-regular cursor-pointer" rounded="lg" @click="addItem">
            <span class="d-inline-block mr-4">{{ label }}</span>
            <v-icon :icon="icon"></v-icon>
        </v-sheet>
    </div>
</template>
<style lang="scss">
.icon-container {
    height: 56px;
}
</style>
