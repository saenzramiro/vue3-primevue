<template>
	<h1 class="hola">{{ nombre }}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MainDashboard',
	data() {
		return {
			nombre: 'Tiziano',
		};
	},
});
</script>
<style scoped></style>
