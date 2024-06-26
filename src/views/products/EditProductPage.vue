<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { InputField, TextArea, BtnMain } from '@/components/controls/common';

const loading = ref(false);
const state = reactive({
    nombre: '',
    descripcion: '',
});

const rules = {
    nombre: {
        required: helpers.withMessage('El nombre es requerido', required),
    },
    descripcion: {
        required: helpers.withMessage('La descripción es requerida', required),
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
                    Editar producto
                </v-card-title>
                <v-divider />
                <v-card-text class="padding-g-forms">
                    <form novalidate @submit.prevent="submit">
                        <v-row>
                            <v-col cols="12">
                                <input-field type="text" v-model="state.nombre"
                                    :error-messages="v$.nombre.$errors.map(e => e.$message)" @input="v$.nombre.$touch"
                                    @blur="v$.nombre.$touch" isRequired label="Nombre*" />
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