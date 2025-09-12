import { createRouter, createWebHistory } from 'vue-router'
import systemRoutes from '@router/system/index.ts'
import Home from '@views/home/index.vue'
import * as routeNames from '@router/route-names'

/**
 * ! 由于后续菜单的具体位置的路径会根据业务不同动态配置，预设所有的菜单都为一级，不适用children了。
 * ! 但是后台动态管理和获取菜单时候需要使用树形接口，routeNames必须全局唯一。
 */
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: routeNames.HOME,
			component: Home
		},
		...systemRoutes
	]
})
// 全局定义路由拦截守卫
router.beforeEach((to, from, next) => {
	/* const token = localStorage.getItem('token')
	if (!token) {
		next({
			name: 'HOME'
		})
	} else {
		next()
	} */
	next()
})

export default router
