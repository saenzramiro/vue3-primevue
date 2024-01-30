<template>
	<Card style="width: 25rem; overflow: hidden">
		<template #header>
			<img alt="user header" src="@/assets/vue.svg" class="w-full" />
		</template>
		<template #title>Advanced Card</template>
		<template #subtitle>Card subtitle</template>
		<template #content>
			<p class="m-0">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam
				repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
			</p>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Cancel" severity="secondary" outlined class="w-full" />
				<Button type="button" class="w-full" @click="counterStore.increment()">count is {{ counterStore.count }}</Button>
			</div>
		</template>
	</Card>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useCounterStore } from '@/store';

export default {
	name: 'HelloWorld',
	computed: {
		...mapStores(useCounterStore, ['counterStore']),
	},
};
</script>

<style scoped></style>
