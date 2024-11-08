/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from './router';

import App from './App.vue';

// Prime
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import StyleClass from 'primevue/styleclass';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import 'primeicons/primeicons.css';
import './style.css';
// import 'gridstack/dist/gridstack.min.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

// app.directive('styleclass', StyleClass);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	ripple: false,
	theme: {
		preset: Aura,
	},
});
app.use(ToastService);
app.use(ConfirmationService);

// Prime components that are not automatically imported by unplugin-vue-components
// import ButtonGroup from 'primevue/buttongroup';
// import Toast from 'primevue/toast';
// import ConfirmPopup from 'primevue/confirmpopup';
// app.component('ButtonGroup', ButtonGroup);
// app.component('Toast', Toast);
// app.component('ConfirmPopup', ConfirmPopup);

// Firebase SDK
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';
import { firebaseApp } from './firebase';
// import { httpsCallable } from 'firebase/functions';

app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth(), VueFireFirestoreOptionsAPI()],
});

// Global vars
// app.config.globalProperties.$httpsCallable = (name: string) => httpsCallable(functions, name);
// app.config.globalProperties.$db = db;
// app.config.globalProperties.$auth = auth;
// app.config.globalProperties.$analytics = analytics;

app.mount('#app');
