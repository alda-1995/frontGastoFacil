<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { InputField, TextArea, BtnMain } from '@/components/controls/common';
import { useProductStore } from '@/store/productStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";
import { useRoute } from 'vue-router'

const productStore = useProductStore();
const route = useRoute();
const loading = ref(false);
const loadingData = ref(true);
const state = reactive({
    id: '',
    name: '',
    description: '',
});

const rules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required),
    },
    description: {
        required: helpers.withMessage('La descripción es requerida', required),
    },
}
const v$ = useVuelidate(rules, state)
const submit = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid)
        return;
    loading.value = true;
    await productStore.saveProduct(state.id, state.name, state.description)
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    loading.value = false;
};

onMounted(async () => {
    if (!route.params.id) {
        return;
    }
    const resultData = await productStore.getDetailProduct(route.params.id)
        .catch(function ({ response }) {
            let errorMessage = getMessageErrors(response);
            toast(errorMessage, {
                "theme": "auto",
                "type": "warning",
                "dangerouslyHTMLString": true
            });
        });
    state.id = resultData.product_id;
    state.name = resultData.name;
    state.description = resultData.description;
    loadingData.value = false;
});
</script>
<template>
    <v-row>
        <v-col cols="12" sm="10" md="8">
            <v-skeleton-loader type="table-heading, list-item, list-item, button" height="400"
                v-if="loadingData"></v-skeleton-loader>
            <v-card v-else="!loadingData">
                <v-card-title class="padding-g-forms">
                    Editar producto
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <form novalidate @submit.prevent="submit">
                        <v-row>
                            <v-col cols="12">
                                <input-field type="text" v-model="state.name"
                                    :error-messages="v$.name.$errors.map(e => e.$message)" @input="v$.name.$touch"
                                    @blur="v$.name.$touch" isRequired label="Nombre*" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <text-area v-model="state.description" label="Descripción" />
                            </v-col>
                        </v-row>
                        <div class="d-flex">
                            <btn-main color="primary" type="submit" :loading="loading" class="mr-4">Guardar</btn-main>
                            <btn-main color="secondary" variant="text" type="link" href="/productos">Cancelar</btn-main>
                        </div>
                    </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>