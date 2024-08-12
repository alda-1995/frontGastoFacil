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
});
const rules = {
    email: {
        required: helpers.withMessage('El correo electronico es requerido', required),
        email: helpers.withMessage('El correo electronico es incorrecto', email)
    },
}
const v$ = useVuelidate(rules, state)
const submit = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid)
        return;
    loading.value = true;
    await authStore.forgotPassword(state.email)
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
    <h2 class="text-secondary text-h3-me mb-4">Ingresa tu correo para restablecer la contraseña</h2>
    <form @submit.prevent="submit" novalidate>
        <v-row>
            <v-col cols="12">
                <input-field icon="mdi-email-outline" type="email" v-model="state.email"
                    :error-messages="v$.email.$errors.map(e => e.$message)" @input="v$.email.$touch"
                    @blur="v$.email.$touch" isRequired label="Correo electronico" />
            </v-col>
        </v-row>
        <div class="mt-6">
            <btn-main :is-block="true" type="submit" :loading="loading" class="mb-4">Enviar</btn-main>
        </div>
    </form>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>