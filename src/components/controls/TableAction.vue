<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { BtnMain } from '@/components/controls/common'

const confirmDelete = ref(false);
const itemDelete = ref({});

defineProps({
    listItems: {
        type: Array,
        default: () => [],
    },
    headers: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
});

const emits = defineEmits(['newItem', 'editItem', 'deleteItem', 'closeModal']);
const handleDeleteItem = () => {
    confirmDelete.value = false;
    emits("deleteItem", itemDelete);
};
const handleEditItem = (item) => { emits("editItem", item); };
const handleNew = () => { emits('newItem'); };
const handleCloseModal = () => {
    confirmDelete.value = false;
};

const handleConfirmDelete = (item) => {
    itemDelete.value = item;
    confirmDelete.value = true;
};
</script>
<template>
    <div class="d-block">
        <div class="d-flex justify-end mb-4">
            <btn-main :on-click="handleNew" type="button" icon="mdi-plus">Nuevo</btn-main>
        </div>
        <v-data-table :headers="headers" :items="listItems">
            <template v-slot:top>
                <v-dialog v-model="confirmDelete" max-width="500px">
                    <v-card class="border pa-6 pa-md-8" elevation="0">
                        <p class="text-large mb-8">Estas seguro de eliminar a {{ itemDelete.nombre }}?</p>
                        <div class="d-flex flex-row justify-center">
                            <btn-main :on-click="() => { handleCloseModal(); }" variant="text"
                                class="mr-4">Cancelar</btn-main>
                            <btn-main :on-click="() => { handleDeleteItem(); }">Eliminar</btn-main>
                        </div>
                    </v-card>
                </v-dialog>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" color="darkprimary" icon="mdi-pencil" class="me-2" @click="handleEditItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" color="error" @click="handleConfirmDelete(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>