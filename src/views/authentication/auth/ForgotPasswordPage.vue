<script setup>
import AuthForgot from '@/views/authentication/authForms/AuthForgot';
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
                                                <auth-forgot />
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