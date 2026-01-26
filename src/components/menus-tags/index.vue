<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue'
	import { useMenusStore } from '@stores/menusStore'
	import type { ScrollbarInstance } from 'element-plus'
	import type { Ref } from 'vue'
	import type { IterMenuItem } from '@ts/menuTypes'
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	const store = useMenusStore()
	const { menusTags, currActivePath } = storeToRefs(store)

	const router = useRouter()
	const scrollbarRef = ref<ScrollbarInstance>()
	const innerRef = ref<HTMLDivElement>()
	const max: Ref<number> = ref(0)
	const currScrollVal: Ref<number> = ref(0)

	const currIndex: Ref<number> = ref(-1)
	const homeMenu: Ref<IterMenuItem> = ref({
		id: 1,
		name: '首页',
		icon: 'Home',
		path: '/'
	})

	watch(
		() => currActivePath.value,
		() => {
			currIndex.value = menusTags.value.findIndex(
				(item: IterMenuItem) => formatRoutePath(item.path) === currActivePath.value
			)
		}
	)

	onMounted(() => {
		max.value = innerRef.value!.clientWidth
	})

	const scrollStep = (direction: 'left' | 'right') => {
		const step = direction === 'left' ? -200 : 200
		scrollbarRef.value!.setScrollLeft(currScrollVal.value + step)
	}
	const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
		currScrollVal.value = scrollLeft
	}
	const formatRoutePath = (path: string) => {
		/**
		 * 把配置的 SYSTEM_BTNS 这样的转换成 system-btns, 与定义的路由的path 对应
		 */
		return path.replace(/_+/g, '-').toLowerCase()
	}
	const handleClick = (item: IterMenuItem, idx: number) => {
		currIndex.value = idx
		router.push(formatRoutePath(item.path))
		store.updateActivePath(formatRoutePath(item.path))
	}
	const handleClose = (idx: number) => {
		store.mixinsMenuTags(idx)
	}
</script>
<template>
	<div class="menus-tags-container">
		<div class="left-btn" @click="scrollStep('left')">
			<el-icon size="18" color="#2d50d7"><DArrowLeft /></el-icon>
		</div>
		<div class="tags-content">
			<el-scrollbar ref="scrollbarRef" @scroll="scroll" :always="false">
				<div class="scroll-tags-wrapper" ref="innerRef">
					<div class="menu-tag-item" :class="{ 'menu-tag-item-active': currIndex === -1 }">
						<span @click="handleClick(homeMenu, -1)">{{ homeMenu.name }}</span>
					</div>
					<div
						class="menu-tag-item"
						:class="{ 'menu-tag-item-active': currIndex === index }"
						v-for="(item, index) in menusTags"
						:key="item.path">
						<span @click="handleClick(item, index)">{{ item.name }}</span>
						&nbsp;&nbsp;
						<el-icon size="16" @click="handleClose(index)"><Close /></el-icon>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<div class="right-btn" @click="scrollStep('right')">
			<el-icon size="18" color="#2d50d7"><DArrowRight /></el-icon>
		</div>
		<div class="edit-btn">
			<el-popover placement="bottom-end">
				<template #reference>
					<span>页签操作</span>
				</template>
				<div>
					<p>关闭所有页面</p>
					<p>关闭当前以外页面</p>
				</div>
			</el-popover>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.menus-tags-container {
		width: 100%;
		height: 2rem;
		margin-top: 0.4rem;
		display: flex;
		.left-btn,
		.right-btn,
		.edit-btn {
			width: 3rem;
			background-color: #fff;
			border-radius: 4px;
			text-align: center;
			line-height: 2.5rem;
			cursor: pointer;
			margin: 0 0.5rem;
		}
		.edit-btn {
			width: 6rem;
			color: #2d50d7;
			line-height: 2rem;
			margin: 0 0.5rem 0 0;
		}
		.tags-content {
			flex: 1;
			overflow: hidden;
			.scroll-tags-wrapper {
				display: flex;
				width: fit-content;
				.menu-tag-item {
					height: 2rem;
					margin-right: 0.5rem;
					background-color: #fff;
					border-radius: 4px;
					padding: 0 0.6rem;
					cursor: pointer;
					display: flex;
					align-items: center;
					&:hover {
						background-color: rgba(63, 78, 213, 0.1);
					}
				}
				.menu-tag-item-active {
					background-color: rgba(63, 78, 213, 0.1);
					color: #2d50d7;
				}
			}
		}
	}
</style>
