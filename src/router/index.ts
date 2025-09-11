import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import systemRoutes from '@router/system/index.ts'

const router = createRouter({
	// history: createWebHistory(`/prefix${import.meta.env.BASE_URL}`),
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue')
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
