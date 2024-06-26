<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, helpers } from '@vuelidate/validators';
import { InputField, InputPassword, BtnMain } from '@/components/controls/common';
import router from "@/router";

const state = reactive({
    name: "",
    lastname: "",
    email: '',
    password: '',
});
const rules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required),
    },
    lastname: {
        required: helpers.withMessage('El apellido es requerido', required),
    },
    email: {
        required: helpers.withMessage('El correo electronico es requerido', required),
        email: helpers.withMessage('El correo electronico es incorrecto', email)
    },
    password: {
        required: helpers.withMessage('La contraseña es requerida', required),
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
    <h5 class="text-h5-me text-center my-4 mb-8">Registrate con tu dirección de correo electrónico</h5>
    <form @submit.prevent="submit" novalidate>
        <v-row>
            <v-col cols="12" sm="6">
                <input-field type="text" v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)"
                    @input="v$.name.$touch" @blur="v$.name.$touch" is-required label="Nombre" />
            </v-col>
            <v-col cols="12" sm="6">
                <input-field type="text" v-model="state.lastname"
                    :error-messages="v$.lastname.$errors.map(e => e.$message)" @input="v$.lastname.$touch"
                    @blur="v$.lastname.$touch" is-required label="Apellido" />
            </v-col>
            <v-col cols="12">
                <input-field icon="mdi-email-outline" type="email" v-model="state.email"
                    :error-messages="v$.email.$errors.map(e => e.$message)" @input="v$.email.$touch"
                    @blur="v$.email.$touch" isRequired label="Correo electronico" />
            </v-col>
            <v-col cols="12">
                <input-password v-model="state.password" :error-messages="v$.password.$errors.map(e => e.$message)"
                    isRequired label="Contraseña" icon="mdi-lock-outline" @input="v$.password.$touch"
                    @blur="v$.password.$touch()" />
            </v-col>
            <v-col cols="12">
                <btn-main type="submit" :is-block="true" :loading="loading" class="mb-4">Registrarme</btn-main>
            </v-col>
        </v-row>
        <div class="mt-5 text-right">
            <v-divider />
            <btn-main href="/auth/register" color="darkText" variant="plain" type="link"
                class="mt-2 text-capitalize mr-n2">Ya tengo una cuenta?</btn-main>
        </div>
    </form>
</template>