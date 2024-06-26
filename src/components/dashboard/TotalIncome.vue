<template>
    <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape-sm bubble-primary mb-6">
        <v-card-text class="pa-5">
            <div class="d-flex align-center ga-4">
                <v-btn color="darkprimary" icon rounded="sm" variant="flat">
                    <BrandCashappIcon stroke-width="1.5" width="25" />
                </v-btn>
                <div>
                    <h4 class="text-h4-me font-weight-medium">$203k</h4>
                    <span class="text-subtitle-2-me text-white">Total Gasto</span>
                </div>
            </div>
        </v-card-text>
    </v-card>
    <v-card elevation="0" class="bubble-shape-sm overflow-hidden bubble-warning">
        <v-card-text class="pa-5">
            <div class="d-flex align-center ga-4">
                <v-btn color="lightwarning" icon rounded="sm" variant="flat">
                    <BusinessplanIcon stroke-width="1.5" width="25" class="text-warning" />
                </v-btn>
                <div>
                    <h4 class="text-h4-me font-weight-medium">$203k</h4>
                    <span class="text-subtitle-2-me text-disabled font-weight-medium">Total Ingreso</span>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { BrandCashappIcon, BusinessplanIcon, MoneybagIcon } from 'vue-tabler-icons';

</script>