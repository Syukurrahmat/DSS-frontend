import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: manifest,
			manifestFilename: 'manifest.json',
		}),
	],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
});
