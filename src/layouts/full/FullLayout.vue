<script setup>
import { RouterView } from 'vue-router';
import SidebarVertical from './vertical/SidebarVertical.vue';
</script>
<template>
  <v-layout>
    <SidebarVertical />
    <v-main>
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>