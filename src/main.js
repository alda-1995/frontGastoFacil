import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss';
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import VueTablerIcons from 'vue-tabler-icons';
// Vuetify
import 'vuetify/styles'
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VueApexCharts);
app.use(VueTablerIcons);
app.use(vuetify);
app.mount('#app');
