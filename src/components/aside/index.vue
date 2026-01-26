<script setup lang="ts">
	import { ref } from 'vue'
	import type { Ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import type { IterMenuItem } from '@ts/menuTypes'
	import { useMenusStore } from '@stores/menusStore'
	const store = useMenusStore()
	const { menuList, currActivePath } = storeToRefs(store)
	const currMenus: Ref<IterMenuItem[]> = ref(menuList.value[0].children || [])

	const menuClick = (menu: IterMenuItem) => {
		if (menu.id || menu.id === 0) {
			store.addMenuTags(menu)
			store.updateActivePath(formatRoutePath(menu.path))
		}
	}

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
			:default-active="currActivePath"
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
					:index="formatRoutePath(item.path)"
					@click="menuClick(item)">
					<el-icon><component :is="item.icon" v-if="item.icon"></component></el-icon>
					<span>{{ item.name }}</span>
				</el-menu-item>
				<el-sub-menu v-else :index="currActivePath">
					<template #title>
						<el-icon><component :is="item.icon" v-if="item.icon"></component></el-icon>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item
						:index="formatRoutePath(child.path)"
						v-for="child in item.children"
						:key="child.id"
						@click="menuClick(item)">
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
