/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import './style.css';
import App from './App.vue';

import Button from 'primevue/button';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue);
app.use(pinia);
app.use(router);

app.component('Button', Button);
app.component('Menu', Menu);

app.mount('#app');
