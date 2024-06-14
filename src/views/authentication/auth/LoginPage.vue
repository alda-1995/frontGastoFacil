<script setup>
import AuthLogin from '@/views/authentication/authForms/AuthLogin'
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
                                            <v-col cols="12" class="text-center">
                                                <!-- <Logo /> -->
                                                <h2 class="text-secondary text-h2-me">Hola, Bienvenido</h2>
                                                <h4 class="text-disabled text-h4-me mt-3">Ingresa tus credenciales</h4>
                                            </v-col>
                                        </v-row>
                                        <auth-login />
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