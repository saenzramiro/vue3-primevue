<template>
	<div :id="'tab-' + object" class="dashboard grid-stack">
		<div v-for="w in items" :key="w.id" :gs-x="w.x" :gs-y="w.y" :gs-w="w.w" :gs-h="w.h" :gs-id="w.id" class="grid-stack-item flex">
			<component :is="w.widget" :object="object"></component>
		</div>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useCounterStore } from '@/store';
import { GridStack } from 'gridstack';

// Widgets
import wOrders from '@/components/widgets/Orders.vue';
import wStatistic from '@/components/widgets/Statistic.vue';
import wSales from '@/components/widgets/Sales.vue';
import wSubmenu from '@/components/widgets/Submenu.vue';
import wPie from '@/components/widgets/Pie.vue';
import wBar from '@/components/widgets/Bar.vue';

export default {
	name: 'Dashboard',
	components: {
		wOrders,
		wStatistic,
		wSales,
		wSubmenu,
		wPie,
		wBar,
	},
	props: {
		// id: {
		// 	type: Number,
		// 	required: true,
		// },
		object: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			grid: null as GridStack | null,
		};
	},
	computed: {
		...mapStores(useCounterStore, ['counterStore']),
		items() {
			const asd = [
				{ widget: 'wStatistic', x: 8, y: 0, w: 6, h: 4, id: 3 },
				{ widget: 'wStatistic', x: 14, y: 0, w: 6, h: 4, id: 5 },
				{ widget: 'wBar', x: 8, y: 4, w: 16, h: 10, id: 4 },
				{ widget: 'wPie', x: 8, y: 14, w: 16, h: 10, id: 2 },
			];
			// TODO: Prevent showing submenu widget on dashboard
			if (this.object !== 'dashboard') asd.push({ widget: 'wSubmenu', x: 0, y: 0, w: 8, h: 20, id: 1 });
			return asd;
		},
	},
	mounted() {
		console.log('Dashboard', this.object);

		this.grid = GridStack.init(
			{
				// acceptWidgets: '.grid-stack-item',
				alwaysShowResizeHandle: false,
				animate: true,
				cellHeight: 'auto',
				column: 24,
				row: 24,
				float: false,
				handle: '.grid-stack-item-content',
				handleClass: 'p-card-caption',
				sizeToContent: false,
				// children: [], // TODO: Use this to add initial widgets
				// staticGrid: true, // TODO: Use this to disable drag and resize
			},
			`#tab-${this.object}`
		);
	},
};
</script>

<style lang="scss" scoped>
.dashboard {
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='14' height='14' fill='none'%3e%3ccircle fill='rgb(31 41 55 / 0.2)' id='pattern-circle' cx='10' cy='10' r='1.6257413380501518'%3e%3c/circle%3e%3c/svg%3e");
	.grid-stack-item {
		padding: 10px !important;
		.p-component {
			overflow: hidden;
			width: 100%;
			height: 100%;
			/* &.p-panel {
			display: flex;
			flex-direction: column;
			.p-toggleable-content {
				flex: 1;
				overflow: auto;
			}
		} */
			&.p-card {
				.p-card-body {
					height: 100%;
					display: flex;
					flex-direction: column;
				}
				.p-card-content {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
				.p-card-caption {
					cursor: move !important;
				}
			}
		}
	}
}

// Gridstack: Generate CSS for 24 columns
.gs-24 > .grid-stack-item {
	width: 4.167%;
}
.gs-24 > .grid-stack-item[gs-x='1'] {
	left: 4.167%;
}
.gs-24 > .grid-stack-item[gs-w='2'] {
	width: 8.333%;
}
.gs-24 > .grid-stack-item[gs-x='2'] {
	left: 8.333%;
}
.gs-24 > .grid-stack-item[gs-w='3'] {
	width: 12.5%;
}
.gs-24 > .grid-stack-item[gs-x='3'] {
	left: 12.5%;
}
.gs-24 > .grid-stack-item[gs-w='4'] {
	width: 16.667%;
}
.gs-24 > .grid-stack-item[gs-x='4'] {
	left: 16.667%;
}
.gs-24 > .grid-stack-item[gs-w='5'] {
	width: 20.833%;
}
.gs-24 > .grid-stack-item[gs-x='5'] {
	left: 20.833%;
}
.gs-24 > .grid-stack-item[gs-w='6'] {
	width: 25%;
}
.gs-24 > .grid-stack-item[gs-x='6'] {
	left: 25%;
}
.gs-24 > .grid-stack-item[gs-w='7'] {
	width: 29.167%;
}
.gs-24 > .grid-stack-item[gs-x='7'] {
	left: 29.167%;
}
.gs-24 > .grid-stack-item[gs-w='8'] {
	width: 33.333%;
}
.gs-24 > .grid-stack-item[gs-x='8'] {
	left: 33.333%;
}
.gs-24 > .grid-stack-item[gs-w='9'] {
	width: 37.5%;
}
.gs-24 > .grid-stack-item[gs-x='9'] {
	left: 37.5%;
}
.gs-24 > .grid-stack-item[gs-w='10'] {
	width: 41.667%;
}
.gs-24 > .grid-stack-item[gs-x='10'] {
	left: 41.667%;
}
.gs-24 > .grid-stack-item[gs-w='11'] {
	width: 45.833%;
}
.gs-24 > .grid-stack-item[gs-x='11'] {
	left: 45.833%;
}
.gs-24 > .grid-stack-item[gs-w='12'] {
	width: 50%;
}
.gs-24 > .grid-stack-item[gs-x='12'] {
	left: 50%;
}
.gs-24 > .grid-stack-item[gs-w='13'] {
	width: 54.167%;
}
.gs-24 > .grid-stack-item[gs-x='13'] {
	left: 54.167%;
}
.gs-24 > .grid-stack-item[gs-w='14'] {
	width: 58.333%;
}
.gs-24 > .grid-stack-item[gs-x='14'] {
	left: 58.333%;
}
.gs-24 > .grid-stack-item[gs-w='15'] {
	width: 62.5%;
}
.gs-24 > .grid-stack-item[gs-x='15'] {
	left: 62.5%;
}
.gs-24 > .grid-stack-item[gs-w='16'] {
	width: 66.667%;
}
.gs-24 > .grid-stack-item[gs-x='16'] {
	left: 66.667%;
}
.gs-24 > .grid-stack-item[gs-w='17'] {
	width: 70.833%;
}
.gs-24 > .grid-stack-item[gs-x='17'] {
	left: 70.833%;
}
.gs-24 > .grid-stack-item[gs-w='18'] {
	width: 75%;
}
.gs-24 > .grid-stack-item[gs-x='18'] {
	left: 75%;
}
.gs-24 > .grid-stack-item[gs-w='19'] {
	width: 79.167%;
}
.gs-24 > .grid-stack-item[gs-x='19'] {
	left: 79.167%;
}
.gs-24 > .grid-stack-item[gs-w='20'] {
	width: 83.333%;
}
.gs-24 > .grid-stack-item[gs-x='20'] {
	left: 83.333%;
}
.gs-24 > .grid-stack-item[gs-w='21'] {
	width: 87.5%;
}
.gs-24 > .grid-stack-item[gs-x='21'] {
	left: 87.5%;
}
.gs-24 > .grid-stack-item[gs-w='22'] {
	width: 91.667%;
}
.gs-24 > .grid-stack-item[gs-x='22'] {
	left: 91.667%;
}
.gs-24 > .grid-stack-item[gs-w='23'] {
	width: 95.833%;
}
.gs-24 > .grid-stack-item[gs-x='23'] {
	left: 95.833%;
}
.gs-24 > .grid-stack-item[gs-w='24'] {
	width: 100%;
}
</style>
