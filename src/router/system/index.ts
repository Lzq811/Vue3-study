import * as routeNams from '@router/route-names'
import type { RouteRecordRaw } from 'vue-router'

const systemRoutes: RouteRecordRaw[] = [
	{
		path: '/system',
		children: [
			{
				path: 'menus',
				name: routeNams.MENUS,
				component: () => import('@views/system/menus/index.vue')
			}
		]
	}
]

export default systemRoutes
