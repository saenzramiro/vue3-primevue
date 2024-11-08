import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from './store/user';
import App from '@/App.vue';
// import Dashboard from '@/views/Dashboard.vue';

// Auth
import Auth from '@/views/auth/Auth.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'app',
			component: App,
			meta: { requiresAuth: true },
			// children: [
			// 	{
			// 		path: '/d/:module',
			// 		name: 'dashboard',
			// 		component: Dashboard,
			// 	},
			// ],
		},
		{
			path: '/auth',
			component: Auth,
			children: [
				{
					path: 'login',
					name: 'login',
					component: Login,
				},
				// {
				// 	path: '/auth/access',
				// 	name: 'accessDenied',
				// 	component: () => import('@/views/pages/auth/Access.vue'),
				// },
				// {
				// 	path: '/auth/error',
				// 	name: 'error',
				// 	component: () => import('@/views/pages/auth/Error.vue'),
				// },
				{
					path: 'register',
					name: 'register',
					component: Register,
				},
				{
					path: 'forgotpassword',
					name: 'forgotpassword',
					component: ForgotPassword,
				},
				// {
				// 	path: '/auth/newpassword',
				// 	name: 'newpassword',
				// 	component: () => import('@/views/pages/auth/NewPassword.vue'),
				// },
				// {
				// 	path: '/auth/verification',
				// 	name: 'verification',
				// 	component: () => import('@/views/pages/auth/Verification.vue'),
				// },
				// {
				// 	path: '/auth/lockscreen',
				// 	name: 'lockscreen',
				// 	component: () => import('@/views/pages/auth/LockScreen.vue'),
				// },
			],
		},
		{
			path: '/pages/empty',
			name: 'empty',
			component: () => import('@/views/Empty.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notfound',
			component: () => import('@/views/NotFound.vue'),
		},
	],
});

router.beforeEach(async to => {
	if (to.meta.requiresAuth) {
		// getCurrentUser
		const currentUser = await useUserStore().currentUser();

		// if the user is not logged in, redirect to the login page
		if (!currentUser) {
			return {
				path: '/auth/login',
				query: {
					// we keep the current path in the query so we can
					// redirect to it after login with
					// `router.push(route.query.redirect || '/')`
					redirect: to.fullPath,
				},
			};
		}
	}
});

export default router;
