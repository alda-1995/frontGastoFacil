<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { InputField, BtnMain, TextArea, SelectMultiple, InputDate, SwitchLabel, ErrorMessages } from '@/components/controls/common';
import { useProductStore } from '@/store/productStore';
import { useSpentStore } from '@/store/spentStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";
import formatDate from '@/helpers/dataUtils';

const productStore = useProductStore();
const spentStore = useSpentStore();

const loading = ref(false);
const state = reactive({
    amount: '',
    description: '',
    products: [],
    dateCurrent: new Date(),
    income: false
});

const listProducts = ref([]);

const rules = {
    amount: {
        required: helpers.withMessage('La cantidad es requerida', required),
    },
    dateCurrent: {
        required: helpers.withMessage('La fecha es requerida', required),
    },
}
const v$ = useVuelidate(rules, state)
const submit = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid)
        return;
    loading.value = true;
    const currentFormat = formatDate(state.dateCurrent, 'YYYY/MM/DD');
    await spentStore.addSpend(state.amount, state.description, currentFormat, state.income, state.products)
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
    loading.value = false;
};

onMounted(async () => {
    await productStore.getProducts()
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    listProducts.value = productStore.listProducts;
});
</script>
<template>
    <v-row>
        <v-col cols="12" sm="10" md="8">
            <v-card>
                <v-card-title class="padding-g-forms">
                    Agregar gasto
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <form novalidate @submit.prevent="submit">
                        <v-row>
                            <v-col cols="12">
                                <text-area v-model="state.description" label="Descripción" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <input-field icon="mdi-currency-usd" type="number" v-model="state.amount"
                                    :error-messages="v$.amount.$errors.map(e => e.$message)" @input="v$.amount.$touch"
                                    @blur="v$.amount.$touch" is-required label="Cantidad*" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <input-date is-required v-model="state.dateCurrent" label="Fecha" />
                                <error-messages :errors="v$.dateCurrent.$errors" />
                            </v-col>
                        </v-row>
                        <v-divider class="my-6" />
                        <v-row>
                            <v-col cols="12">
                                <switch-label label="Ingreso" v-model="state.income" />
                            </v-col>
                            <v-col cols="12">
                                <select-multiple title-select="name" value-select="id" :items="listProducts"
                                    label="Asignar productos" v-model="state.products" />
                            </v-col>
                        </v-row>
                        <div class="d-flex">
                            <btn-main color="primary" type="submit" :loading="loading" class="mr-4">Guardar</btn-main>
                            <btn-main color="secondary" variant="text" type="link"
                                href="/mis-gastos">Cancelar</btn-main>
                        </div>
                    </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>