<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { InputField, BtnMain, TextArea, SelectMultiple, InputDate } from '@/components/controls/common';

const loading = ref(false);
const state = reactive({
    price: '',
    description: '',
    productos: [],
    dateCurrent: ''
});

const products = [
    {
        "value": 1,
        "nombre": "Producto 1",
    }
];

const rules = {
    price: {
        required: helpers.withMessage('El precio es requerido', required),
    },
}
const v$ = useVuelidate(rules, state)
const submit = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid)
        return
};
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
                            <v-col cols="12" sm="6">
                                <input-field icon="mdi-currency-usd" type="number" v-model="state.price"
                                    :error-messages="v$.price.$errors.map(e => e.$message)" @input="v$.price.$touch"
                                    @blur="v$.price.$touch" isRequired label="Precio*" />
                            </v-col>
                        </v-row>
                        <v-divider class="my-6" />
                        <v-row>
                            <v-col cols="12" sm="6">
                                <input-date v-model="state.dateCurrent" label="Fecha" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <select-multiple :items="products" label="Productos" v-model="state.productos" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <text-area v-model="state.description" label="Descripción" />
                            </v-col>
                        </v-row>
                        <btn-main color="primary" type="submit" :loading="loading" class="mb-4">Guardar</btn-main>
                    </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>