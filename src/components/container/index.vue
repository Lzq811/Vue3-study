<script setup lang="ts">
	import Header from '@components/header/index.vue'
	import Aside from '@components/aside/index.vue'
</script>
<template>
	<el-container class="container-layout">
		<el-aside width="200px" class="aside-container"><Aside /></el-aside>
		<el-container>
			<el-header class="header-container"><Header /></el-header>
			<el-main class="main-container">
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>
<style lang="less" scoped>
	.container-layout {
		width: 100%;
		height: 100%;
		background-color: #f1f2f5;
		box-sizing: border-box;
		.aside-container {
			background-color: #fff;
			border-right: 1px solid #ccc;
		}
		.header-container {
			background-color: #fff;
			border-bottom: 1px solid #ccc;
		}
		.main-container {
			padding: 0.5rem;
		}
	}
</style>
