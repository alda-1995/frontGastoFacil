<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, helpers, sameAs } from '@vuelidate/validators';
import { InputField, InputPassword, BtnMain } from '@/components/controls/common';
import { useAuthStore } from '@/store/authStore';
import { toast } from "vue3-toastify";
import getMessageErrors from '@/helpers/util';

const authStore = useAuthStore();
const loading = ref(false);
const state = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});
const rules = {
    email: {
        required: helpers.withMessage('El correo electronico es requerido', required),
        email: helpers.withMessage('El correo electronico es incorrecto', email)
    },
    password: {
        required: helpers.withMessage('La contraseña es requerida', required),
    },
    confirmPassword: {
        required: helpers.withMessage('Confirma la contraseña', required),
        sameAsPassword: sameAs(state.password)
    }
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
            <v-col cols="12">
                <input-password v-model="state.confirmPassword" :error-messages="v$.confirmPassword.$errors.map(e => e.$message)"
                    isRequired label="Confirmar Contraseña" icon="mdi-lock-outline" @input="v$.confirmPassword.$touch"
                    @blur="v$.confirmPassword.$touch()" />
            </v-col>
        </v-row>
        <div class="mt-5">
            <btn-main :is-block="true" type="submit" :loading="loading" class="mb-4">Restablecer</btn-main>
        </div>
    </form>
</template>