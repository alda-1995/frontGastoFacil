<script setup>
import { ref } from 'vue';
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
</script>

<template>
    <div class="pa-4">
        <h4 class="mb-2">Bienvenido, <span class="font-weight-regular">{{ authStore.user.name }}</span></h4>
        <v-divider></v-divider>
        <v-list class="mt-3">
            <v-list-item to="/" color="secondary" rounded="md">
                <template v-slot:prepend>
                    <UserIcon size="20" class="mr-2" />
                </template>
                <v-list-item-title class="text-subtitle-2-me">Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
                <template v-slot:prepend>
                    <LogoutIcon size="20" class="mr-2" />
                </template>
                <v-list-item-title class="text-subtitle-2-me"> Cerrar sesión</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>