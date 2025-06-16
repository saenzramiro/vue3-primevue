<template>
	<Card>
		<template #title>Simple Card</template>
		<template #content>
			<p class="m-0">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam
				repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
			</p>
		</template>
	</Card>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useStateStore } from '@/store';

export default {
	name: 'App',
	components: {},
	data() {
		return {};
	},
	computed: {
		...mapStores(useStateStore),
	},
	methods: {},
};
</script>
<style lang="scss"></style>
