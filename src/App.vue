<script setup lang="ts">
	import api from '@api/index.ts'
	import { RouterLink, RouterView } from 'vue-router'
	import HelloWorld from './components/HelloWorld.vue'
	import { onMounted, ref } from 'vue'

	const dogPic = ref('')
	const getDogPic = async () => {
		const res = await api.common.ReqGetDogs()
		if (res.status === 'success') {
			dogPic.value = res.message
		}
	}

	onMounted(() => {
		getDogPic()
		console.log(import.meta.env)
		/* {
      "BASE_URL": "/",
      "DEV": true,
      "MODE": "test",
      "PROD": false,
      "SSR": false,
      "VITE_API_BASE_URL": "https://api.test.com",
      "VITE_APP_ID": "201937493743743755"
    } */
	})
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

		<div class="wrapper">
			<HelloWorld msg="You did it!" />
			<el-button type="primary" @click="getDogPic">获取狗狗图片</el-button>
			<div class="less-text">hello Less</div>
			<div>
				<img :src="dogPic" alt="logo" width="200px" height="200px" />
			</div>
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style lang="less" scoped>
	.less-text {
		color: red;
		font-size: 36px;
	}
</style>

<style scoped>
	header {
		line-height: 1.5;
		max-height: 100vh;
	}

	.logo {
		display: block;
		margin: 0 auto 2rem;
	}

	nav {
		width: 100%;
		font-size: 12px;
		text-align: center;
		margin-top: 2rem;
	}

	nav a.router-link-exact-active {
		color: var(--color-text);
	}

	nav a.router-link-exact-active:hover {
		background-color: transparent;
	}

	nav a {
		display: inline-block;
		padding: 0 1rem;
		border-left: 1px solid var(--color-border);
	}

	nav a:first-of-type {
		border: 0;
	}

	@media (min-width: 1024px) {
		header {
			display: flex;
			place-items: center;
			padding-right: calc(var(--section-gap) / 2);
		}

		.logo {
			margin: 0 2rem 0 0;
		}

		header .wrapper {
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}

		nav {
			text-align: left;
			margin-left: -1rem;
			font-size: 1rem;

			padding: 1rem 0;
			margin-top: 1rem;
		}
	}
</style>
