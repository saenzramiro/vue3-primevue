import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import HelloWorld from '@/components/HelloWorld.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
		},
		{
			path: '/hello',
			name: 'HelloWorld',
			component: HelloWorld,
		},
	],
});

export default router;
