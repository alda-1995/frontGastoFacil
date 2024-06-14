<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <v-list-subheader color="darkText" class="title-head-list-header">{{ props.item.header }}</v-list-subheader>
</template>
