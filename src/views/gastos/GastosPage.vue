<template>
    <v-row>
        <v-col cols="12" sm="10">
            <v-card>
                <v-card-title class="padding-g-forms">
                    Mis gastos
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <div class="select-max">
                        <select-field label="Mes" v-model="selectedMonth" :items="meses" />
                    </div>
                    <table-action @new-item="router.push('/agregar-gasto')" @edit-item="editSpent"
                        @delete-item="deleteSpent()" :headers="headersTable" :list-items="listItems" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { TableAction } from '@/components/controls/common';
import { useRouter } from 'vue-router';
import { SelectField } from '@/components/controls/common';

let router = useRouter()
const selectedMonth = ref("");

const headersTable = [
    { title: 'Acciones', key: 'actions', sortable: false },
    {
        title: 'Precio',
        align: 'start',
        sortable: true,
        key: 'price',
    },
    { title: 'Descripción', key: 'description' },
    { title: 'Fecha', key: 'dateCurrent' },
    { title: 'Tipo de gasto', key: 'income' },
];

const meses = [
    {
        "id": "",
        "nombre": "Actual"
    },
    {
        "id": "01",
        "nombre": "Enero"
    },
    {
        "id": "02",
        "nombre": "Febrero"
    },
    {
        "id": "03",
        "nombre": "Marzo"
    },
    {
        "id": "04",
        "nombre": "Abril"
    }
]

const listItems = reactive([
    {
        "id": 1,
        "price": "$10.5",
        "description": "Comida",
        "dateCurrent": "12/01/2024",
        "income": "Ingreso"
    },
    {
        "id": 1,
        "price": "$10.5",
        "description": "Comida",
        "dateCurrent": "12/01/2024",
        "income": "Gasto"
    }
]);

const editSpent = (item) => {
    router.push({ name: 'EditarGasto', params: { id: item.id } });
};

const deleteSpent = () => {
    alert("entra");
};
</script>