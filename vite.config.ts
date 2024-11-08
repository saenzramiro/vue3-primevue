import * as path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { VitePWA } from 'vite-plugin-pwa';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		eslintPlugin(),
		vue(),
		vueDevTools(),
		Components({
			resolvers: [PrimeVueResolver()],
		}),
		VitePWA({
			strategies: 'generateSW',
			// when using strategies 'injectManifest' you need to provide the srcDir
			// srcDir: 'src',
			// when using strategies 'injectManifest' use claims-sw.ts or prompt-sw.ts
			// filename: 'prompt-sw.ts',
			registerType: 'prompt',
			injectRegister: false,
			pwaAssets: { disabled: false, config: true, htmlPreset: '2023', overrideManifestIcons: true },
			manifest: {
				name: 'Vue 3 PrimeVue',
				short_name: 'Vue3PrimeVue',
				theme_color: '#8B5CF6',
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},
			injectManifest: {
				globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
			},
			devOptions: {
				enabled: true,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				/* when using generateSW the PWA plugin will switch to classic */
				type: 'module',
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'~': path.resolve(__dirname, 'node_modules/'),
		},
	},
});
