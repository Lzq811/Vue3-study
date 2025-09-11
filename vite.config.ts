import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
	base: '/pre-test/',
	envDir: './envConfig',
	plugins: [
		vue(),
		vueDevTools(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				// 启用 JavaScript 表达式（某些 Less 插件可能需要）
				javascriptEnabled: true
				// 可选：全局注入 Less 变量或混入文件，这样每个 Less 文件都会自动导入
				// additionalData: `@import "@/styles/variables.less";`, // 根据你的文件路径调整
			}
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@api': fileURLToPath(new URL('./src/api', import.meta.url)),
			'@views': fileURLToPath(new URL('./src/views', import.meta.url)),
			'@router': fileURLToPath(new URL('./src/router', import.meta.url))
		}
	}
})
