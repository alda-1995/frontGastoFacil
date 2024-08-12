<script setup>
import AuthReset from '@/views/authentication/authForms/AuthReset';
</script>
<template>
    <v-row class="h-screen" no-gutters>
        <v-col cols="12" class="d-flex align-center bg-lightprimary">
            <v-container>
                <div class="pa-sm-12">
                    <v-row justify="center">
                        <v-col cols="12" lg="10" xl="6" md="7">
                            <v-card elevation="0" class="loginBox">
                                <v-card variant="outlined">
                                    <v-card-text class="py-10 pa-md-9">
                                        <v-row>
                                            <v-col cols="12">
                                                <h2 class="text-secondary text-h3-me mb-4">Restablecer contraseña</h2>
                                                <auth-reset />
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>