<script setup>
import { reactive, ref, onMounted } from 'vue';
import { TableAction } from '@/components/controls/common';
import { useRouter } from 'vue-router';
import { SelectField } from '@/components/controls/common';
import { useSpentStore } from '@/store/spentStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";

let spentStore = useSpentStore();
let router = useRouter();
const selectedMonth = ref("");
const state = reactive({
    listItems: []
});

const headersTable = [
    { title: 'Acciones', key: 'actions', sortable: false },
    {
        title: 'Cantidad',
        align: 'start',
        sortable: true,
        key: 'amount',
    },
    { title: 'Descripción', key: 'description' },
    { title: 'Fecha', key: 'currentDate' },
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
];

const editSpent = (item) => {
    router.push({ name: 'EditarGasto', params: { id: item.transaction_id } });
};

const deleteSpent = async (item) => {
    await spentStore.deleteSpent(item.transaction_id).catch(function ({ response }) {
        let errorMessage = getMessageErrors(response);
        toast(errorMessage, {
            "theme": "auto",
            "type": "warning",
            "dangerouslyHTMLString": true
        });
    });
    state.listItems = spentStore.listSpents;
};

onMounted(async () => {
    await spentStore.getSpents()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    state.listItems = spentStore.listSpents;
});
</script>
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
                        @delete-item="deleteSpent" :headers="headersTable" :list-items="state.listItems" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>