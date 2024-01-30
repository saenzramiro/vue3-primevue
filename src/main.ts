/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import App from './App.vue';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, { ripple: false });

app.mount('#app');
