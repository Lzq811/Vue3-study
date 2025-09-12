import * as routeNames from '@router/route-names'
import type { RouteRecordRaw } from 'vue-router'

const systemRoutes: RouteRecordRaw[] = [
	{
		path: '/system-menus',
		name: routeNames.SYSTEM_MENUS,
		component: () => import('@views/system/menus/index.vue')
	},
	{
		path: '/system-btns',
		name: routeNames.SYSTEM_BTNS,
		component: () => import('@views/system/menus/index.vue')
	}
]

export default systemRoutes
