<script setup>
import { ref } from 'vue';
import { useCustomizerStore } from '@/store/menuStore';
import { UserCogIcon, Menu2Icon } from 'vue-tabler-icons';
import SubMenu from './SubMenu.vue';

// dropdown imports
// import NotificationDD from './NotificationDD.vue';
// import ProfileDD from './ProfileDD.vue';
// import Searchbar from './SearchBarPanel.vue';

const customizer = useCustomizerStore();
const showSearch = ref(false);
function searchbox() {
  showSearch.value = !showSearch.value;
}
</script>

<template>
  <v-app-bar elevation="0" height="80" :order="1">
    <v-btn
      class="hidden-md-and-down text-secondary"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-spacer />
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn text-primary" color="secondary" variant="flat" rounded="pill" v-bind="props">
          <!-- <v-avatar size="30" class="mr-2 py-2">
            <img src="@/assets/images/profile/user-round.svg" alt="Julia" />
          </v-avatar> -->
          <UserCogIcon color="white" stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <sub-menu />
        <!-- <ProfileDD /> -->
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
