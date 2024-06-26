<script setup>
import { reactive, ref } from 'vue'
import { TableAction } from '@/components/controls/common';
import { useRouter } from 'vue-router'

let router = useRouter()

const headersTable = [
    { title: 'Acciones', key: 'actions', sortable: false },
    {
        title: 'Nombre',
        align: 'start',
        sortable: false,
        key: 'nombre',
    },
    { title: 'Descripción', key: 'descripcion' },
];

const listItems = reactive([
    {
        "id": 1,
        "nombre": "Producto 1",
        "descripcion": "lorem asdad asdasd asd"
    }
]);

const addProduct = () => {
    // router.push('/agregar-producto');
};

const editProduct = (item) => {
    router.push({ name: 'EditarProducto', params: { id: item.id } });
};

const deleteProduct = () => {
    alert("entra");
};
</script>
<template>
    <v-row>
        <v-col cols="12" sm="10">
            <v-card>
                <v-card-title class="padding-g-forms">
                    Lista de productos
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <table-action 
                    @new-item="addProduct()" 
                    @edit-item="editProduct"
                    @delete-item="deleteProduct()"
                    :headers="headersTable"
                    :list-items="listItems"
                    />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>