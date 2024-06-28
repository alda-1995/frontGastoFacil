<script setup>
import { defineProps} from 'vue';
defineProps({
    errors: {
        type: Array,
        default: () => [],
    }
});
</script>
<template>
    <div class="text-error" v-for="error of errors" :key="error.$uid">{{ error.$message }}</div>
</template>