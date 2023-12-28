<template>
	<header>Header</header>
	<section>
		<nav><Menu :model="items" /></nav>
		<main id="main">
			<router-view />
		</main>
		<aside>asdasd</aside>
	</section>
	<footer>Footer</footer>
</template>
<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	data() {
		return {
			items: [
				{
					label: 'Documents',
					items: [
						{
							label: 'Dashboard',
							icon: 'pi pi-plus',
							show: 'dashboard',
							command: this.onMenuClick,
						},
						{
							label: 'HelloWorld',
							icon: 'pi pi-search',
							show: 'hello',
							command: this.onMenuClick,
						},
					],
				},
				{
					label: 'Profile',
					items: [
						{
							label: 'Settings',
							icon: 'pi pi-cog',
						},
						{
							label: 'Logout',
							icon: 'pi pi-sign-out',
						},
					],
				},
			],
		};
	},
	methods: {
		onMenuClick(event: any) {
			router.push(event.item.show);
		},
	},
});
</script>
<style>
html,
body {
	height: 100%;
	margin: 0;
}
#app {
	height: 100%;
	display: flex;
	flex-direction: column;
}
header {
	background-color: #f00;
	height: 100px;
}
section {
	background-color: #0f0;
	flex: 1;
	display: flex;
	flex-direction: row;
}
nav {
	background-color: aqua;
	flex: 1;
}
nav .p-menu {
	height: 100%;
}
main {
	background-color: blueviolet;
	flex: 5;
}
aside {
	background-color: chocolate;
	flex: 1;
	width: 200px;
	display: none;
}
footer {
	background-color: darkolivegreen;
	height: 100px;
}
</style>
