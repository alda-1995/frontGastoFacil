<script setup>
import { reactive, onMounted, ref } from 'vue'
import { TableAction } from '@/components/controls/common';
import { useRouter } from 'vue-router'
import { useProductStore } from '@/store/productStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";

const productStore = useProductStore();
let router = useRouter()
const loadingData = ref(true);

const headersTable = [
    { title: 'Acciones', key: 'actions', sortable: false },
    {
        title: 'Nombre',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: 'Descripción', key: 'description' },
];

const state = reactive({
    listItems: []
});

const editProduct = (item) => {
    router.push({ name: 'EditarProducto', params: { id: item.id } });
};

const deleteProduct = async (item) => {
    await productStore.deleteProduct(item.id).catch(function ({ response }) {
        let errorMessage = getMessageErrors(response);
        if (!errorMessage)
        return;
        toast(errorMessage, {
            "theme": "auto",
            "type": "warning",
            "dangerouslyHTMLString": true
        });
    });
    state.listItems = productStore.listProducts;
};

onMounted(async () => {
    await productStore.getProducts()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            if (!errorMessage)
            return;
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    state.listItems = productStore.listProducts;
    loadingData.value = false;
});
</script>
<template>
    <v-row>
        <v-col cols="12" sm="10">
            <v-skeleton-loader type="table-heading, table-tbody" height="400"
            v-if="loadingData"></v-skeleton-loader>
            <v-card v-else>
                <v-card-title class="padding-g-forms">
                    Lista de productos
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <table-action @new-item="router.push('/agregar-producto')" @edit-item="editProduct"
                        @delete-item="deleteProduct" :headers="headersTable" :list-items="state.listItems" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>