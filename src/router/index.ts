import { createRouter, createWebHistory } from 'vue-router'
import systemRoutes from '@router/system/index.ts'
import Home from '@views/home/index.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		...systemRoutes
	]
})
// 全局定义路由拦截守卫
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')
	if (!token) {
		next({
			name: 'LOGIN'
		})
	} else {
		next()
	}
})

export default router
