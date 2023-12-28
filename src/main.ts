import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';

import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue);
app.use(pinia);

// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Button', Button);

app.mount('#app');
