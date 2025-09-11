<script setup lang="ts">
	import Container from '@components/container/index.vue'
	import { ref } from 'vue'
	import type { Ref } from 'vue'
	const msg: Ref<string> = ref('hello vue3 component')
</script>
<template>
	<Container />
</template>
