<template>
	<div class="grid">
		<div class="col">
			<h3>Árbol 1</h3>
			<draggable class="dragArea" tag="ul" :list="tree1" group="g1" item-key="key">
				<template #item="{ element }">
					<li>
						<p>{{ element.label }}</p>
						<!-- <nested-draggable :tasks="element.tasks" /> -->
					</li>
				</template>
			</draggable>
		</div>
		<div class="col">
			<h3>Árbol 2</h3>
			<draggable class="dragArea" tag="ul" :list="tree2" group="g1" item-key="key">
				<template #item="{ element }">
					<span>
						<Tree :value="[{ ...element }]" />
						<Tree v-if="element.children" :value="element.children" />
					</span>
				</template>
			</draggable>
		</div>
	</div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';

export default {
	name: 'CustomMenu',
	components: {
		draggable,
	},
	data() {
		return {
			tree1: [
				{
					key: '0',
					label: 'Documents',
					data: 'Documents Folder',
					icon: 'pi pi-fw pi-inbox',
					children: [
						{
							key: '0-0',
							label: 'Work',
							data: 'Work Folder',
							icon: 'pi pi-fw pi-cog',
							children: [
								{ key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
								{ key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' },
							],
						},
						{
							key: '0-1',
							label: 'Home',
							data: 'Home Folder',
							icon: 'pi pi-fw pi-home',
							children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }],
						},
					],
				},
				{
					key: '1',
					label: 'Homeee',
					data: 'Home Folder',
					icon: 'pi pi-fw pi-home',
					children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }],
				},
			],
			tree2: [
				{
					key: '1',
					label: 'Pictures',
					data: 'Pictures Folder',
					icon: 'pi pi-fw pi-image',
					children: [
						{
							key: '1-0',
							label: 'Camera',
							data: 'Camera Folder',
							icon: 'pi pi-fw pi-camera',
							children: [
								{ key: '1-0-0', label: 'IMG_001.jpg', icon: 'pi pi-fw pi-image', data: 'Camera Image' },
								{ key: '1-0-1', label: 'IMG_002.jpg', icon: 'pi pi-fw pi-image', data: 'Camera Image' },
							],
						},
					],
				},
			],
		};
	},
	methods: {
		onDragEnd(event) {
			const { item, from, to, newIndex } = event;

			// Eliminar el nodo del lugar original
			this.removeNode(from, item.key);

			// Añadir el nodo al nuevo lugar
			this.insertNode(to, item, newIndex);
		},
		removeNode(tree, key) {
			for (let i = 0; i < tree.length; i++) {
				const node = tree[i];
				if (node.key === key) {
					tree.splice(i, 1);
					return;
				}
				if (node.children) {
					this.removeNode(node.children, key);
				}
			}
		},
		insertNode(tree, node, index) {
			tree.splice(index, 0, node);
		},
	},
};
</script>
