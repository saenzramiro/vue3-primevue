<template>
	<div class="flex">
		<div class="surface-section w-full min-h-screen flex flex-column justify-content-center align-items-center md:w-6 p-6 md:p-8">
			<div><router-view /></div>
		</div>
		<div
			class="hidden md:block w-6 bg-no-repeat bg-cover"
			style="background-image: url('https://mastersolutions.com.ar/wallpapers/01-05.jpg')"
		></div>
	</div>
</template>
<script lang="ts">
export default {
	name: 'Auth',
};
</script>
