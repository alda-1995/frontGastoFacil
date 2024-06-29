<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { TableAction } from '@/components/controls/common';
import { useRouter } from 'vue-router';
import { SelectField } from '@/components/controls/common';
import { useSpentStore } from '@/store/spentStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";
import { useReportGastoStore } from '@/store/reportGastoStore';

let spentStore = useSpentStore();
const reportStore = useReportGastoStore();
let router = useRouter();
const loadingData = ref(true);
const selectedMonth = ref(null);
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
        "value": "all",
        "name": "Hoy"
    },
    {
        "value": "01",
        "name": "Enero"
    },
    {
        "value": "02",
        "name": "Febrero"
    },
    {
        "value": "03",
        "name": "Marzo"
    },
    {
        "value": "04",
        "name": "Abril"
    },
    {
        "value": "05",
        "name": "Mayo"
    },
    {
        "value": "06",
        "name": "Junio"
    },
    {
        "value": "07",
        "name": "Julio"
    },
    {
        "value": "08",
        "name": "Agosto"
    },
    {
        "value": "09",
        "name": "Septiembre"
    },
    {
        "value": "10",
        "name": "Octubre"
    },
    {
        "value": "11",
        "name": "Noviembre"
    },
    {
        "value": "12",
        "name": "Diciembre"
    },
];

watch(selectedMonth, async (newFilterMonth) => {
    if (newFilterMonth == "all") {
        state.listItems = spentStore.listSpents;
        return;
    }
    await reportStore.getTotalGastoByMonth(newFilterMonth).catch(function ({ response }) {
        let errorMessage = getMessageErrors(response);
        if (!errorMessage)
        return;
        toast(errorMessage, {
            "theme": "auto",
            "type": "warning",
            "dangerouslyHTMLString": true
        });
    });
    state.listItems = reportStore.listSpents;
})

const editSpent = (item) => {
    router.push({ name: 'EditarGasto', params: { id: item.transaction_id } });
};

const deleteSpent = async (item) => {
    await spentStore.deleteSpent(item.transaction_id).catch(function ({ response }) {
        let errorMessage = getMessageErrors(response);
        if (!errorMessage)
        return;
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
            if (!errorMessage)
            return;
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    state.listItems = spentStore.listSpents;
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
                    Mis gastos
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <div class="select-max">
                        <select-field label="Filtrar por:" v-model="selectedMonth" :items="meses" />
                    </div>
                    <table-action @new-item="router.push('/agregar-gasto')" @edit-item="editSpent"
                        @delete-item="deleteSpent" :headers="headersTable" :list-items="state.listItems" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>