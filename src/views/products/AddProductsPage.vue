<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { InputField, TextArea, BtnMain } from '@/components/controls/common';
import { useProductStore } from '@/store/productStore';
import getMessageErrors from '@/helpers/util';
import { toast } from "vue3-toastify";

const productStore = useProductStore();
const loading = ref(false);
const state = reactive({
    name: 'Product 1',
    description: 'lorem lorem asdasda asd as',
});

const rules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required),
    }
}
const v$ = useVuelidate(rules, state)
const submit = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid)
        return;
    loading.value = true;
    await productStore.addProduct(state.name, state.description)
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
</script>
<template>
    <v-row>
        <v-col cols="12" sm="10" md="8">
            <v-card>
                <v-card-title class="padding-g-forms">
                    Agregar producto
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <form novalidate @submit.prevent="submit">
                        <v-row>
                            <v-col cols="12">
                                <input-field type="text" v-model="state.name"
                                    :error-messages="v$.name.$errors.map(e => e.$message)" @input="v$.name.$touch"
                                    @blur="v$.name.$touch" is-required label="Nombre*" />
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