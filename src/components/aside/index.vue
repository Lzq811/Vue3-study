<script setup lang="ts">
	import { ref } from 'vue'
	import type { Ref } from 'vue'
	interface Menu {
		id: number
		name: string
		path: string
		icon?: string
		children?: Menu[]
	}
	const menus: Ref<Menu[]> = ref([
		{
			id: 1,
			name: '系统管理',
			icon: 'el-icon-setting',
			path: '#',
			children: [
				{
					id: 2,
					name: '菜单管理',
					icon: 'Menu',
					path: 'SYSTEM_MENUS'
				},
				{
					id: 3,
					name: '按钮管理',
					icon: 'Pointer',
					path: 'SYSTEM_BTNS'
				},
				{
					id: 4,
					name: '协议管理',
					icon: 'WarnTriangleFilled',
					path: '#',
					children: [
						{
							id: 5,
							name: '平台协议',
							icon: 'Paperclip',
							path: 'SYSTEM_PROTOCOL'
						},
						{
							id: 6,
							name: '会员协议',
							icon: 'User',
							path: 'SYSTEM_MEMBER_PROTOCOL'
						}
					]
				}
			]
		}
	])
	const currMenus: Ref<Menu[]> = ref(menus.value[0].children || [])

	const formatRoutePath = (path: string) => {
		/**
		 * 把配置的 SYSTEM_BTNS 这样的转换成 system-btns, 与定义的路由的path 对应
		 */
		return path.replace(/_+/g, '-').toLowerCase()
	}
</script>
<template>
	<div class="logo-wrapper">Logo Logo</div>
	<el-scrollbar class="menu-scroll-wrapper">
		<el-menu
			default-active="/"
			:collapse="false"
			:collapse-transition="true"
			background-color="#fff"
			text-color="#666"
			active-text-color="#2D50D7"
			router
			class="menu-wrapper">
			<template v-for="item in currMenus" :key="item.id">
				<el-menu-item
					v-if="!item.children || item.children.length === 0"
					:index="formatRoutePath(item.path)">
					<el-icon><component :is="item.icon" v-if="item.icon"></component></el-icon>
					<span>{{ item.name }}</span>
				</el-menu-item>
				<el-sub-menu v-else>
					<template #title>
						<el-icon><component :is="item.icon" v-if="item.icon"></component></el-icon>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item
						:index="formatRoutePath(child.path)"
						v-for="child in item.children"
						:key="child.id">
						<el-icon><component :is="child.icon" v-if="child.icon"></component></el-icon>
						<span>{{ child.name }}</span>
					</el-menu-item>
				</el-sub-menu>
			</template>
		</el-menu>
	</el-scrollbar>
</template>
<style lang="less" scoped>
	.menu-scroll-wrapper {
		height: 100%;
		// 100%高度减去顶部导航栏高度(也就logo栏高度)
		height: calc(100vh - 60px);
	}
	.menu-wrapper {
		border: none;
		:deep(.el-menu-item.is-active) {
			background-color: rgba(63, 78, 213, 0.1);
			border-right: 2px solid #2d50d7;
			font-weight: 500;
		}
		:deep(.el-menu-item:hover) {
			background-color: rgba(63, 78, 213, 0.1);
		}
		:deep(.el-sub-menu__title:hover) {
			background-color: rgba(63, 78, 213, 0.1);
		}
	}
	.logo-wrapper {
		width: 100%;
		height: 60px;
		background-color: #fff;
		border: 1px solid #eee;
		text-align: center;
		line-height: 60px;
		color: #2d50d7;
	}
</style>
