import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				app: '/index.app.html',
				login: '/index.login.html'
			}
		}
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {

	}
})
