<script setup>
import { RouterView } from 'vue-router';
import SidebarVertical from './vertical/SidebarVertical.vue';
import Navbar from './navbar/NavBar.vue'
import { useCustomizerStore } from '@/store/menuStore';

const customizer = useCustomizerStore();
</script>
<template>
  <v-app theme="PurpleTheme"
    :class="[customizer.fontTheme, customizer.mini_sidebar ? 'mini-sidebar' : '', customizer.inputBg ? 'inputWithbg' : '']">
    <Navbar />
    <SidebarVertical />
    <v-main>
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>