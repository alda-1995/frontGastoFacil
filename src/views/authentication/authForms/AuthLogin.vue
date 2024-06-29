<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, helpers } from '@vuelidate/validators';
import { InputField, InputPassword, BtnMain } from '@/components/controls/common';
import { useAuthStore } from '@/store/authStore';
import { toast } from "vue3-toastify";
import getMessageErrors from '@/helpers/util';

const authStore = useAuthStore();
const loading = ref(false);
const state = reactive({
    email: '',
    password: '',
    isRemember: false
});
const rules = {
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
        return;
    loading.value = true;
    await authStore.login(state.email, state.password)
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
</script>
<template>
    <h5 class="text-h5-me text-center my-4 mb-8">Iniciar sesión con dirección de correo electrónico</h5>
    <form @submit.prevent="submit" novalidate>
        <v-row>
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
        </v-row>
        <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
            <v-checkbox v-model="state.isRemember" label="¿Recordarme?" required color="primary" class="ms-n2"
                hide-details></v-checkbox>
            <div class="ml-auto">
                <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot password?</a>
            </div>
        </div>
        <btn-main :is-block="true" type="submit" :loading="loading" class="mb-4">Entrar</btn-main>
        <div class="mt-5 text-right">
            <v-divider />
            <btn-main href="/auth/register" color="darkText" variant="plain" type="link"
                class="mt-2 text-capitalize mr-n2">No tengo una cuenta?</btn-main>
        </div>
    </form>
</template>