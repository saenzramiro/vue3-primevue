<template>
	<Dialog
		v-model:visible="stateStore.searchDialog"
		dismissable-mask
		modal
		:show-header="false"
		:breakpoints="{ '960px': '75vw', '640px': '100vw' }"
		:style="{ width: '50vw' }"
		content-class="border-round-top p-0"
		append-to="body"
		@hide="onHide"
		@show="onShow"
	>
		<div class="flex w-full surface-section align-items-center justify-content-between px-1">
			<IconField icon-position="left" class="w-full border-0">
				<InputIcon class="pi pi-search" />
				<InputText v-model="searchValue" type="text" size="small" class="w-full border-0" placeholder="Buscar..." autofocus />
			</IconField>
			<!-- <span class="p-input-icon-left w-full">
							<i class="pi pi-search text-500"></i>
							<InputText
								ref="input1"
								v-model="searchValue"
								type="text"
								placeholder="Search menus, shortcuts, contact and more..."
								class="w-full border-none shadow-none outline-none"
							/>
						</span> -->
			<span class="border-1 p-1 surface-border border-round surface-100 mr-2 text-600 text-xs hidden md:block">⌘K</span>
		</div>
		<div :class="{ 'border-y-1': findings.length }" class="surface-border px-3 py-3">
			<h2 class="font-semibold text-xs text-500 mb-2 mt-0 px-1">RECIENTES</h2>
			<ul class="list-none m-0 p-0">
				<li class="select-none p-2 font-medium text-base cursor-pointer border-round-lg hover:surface-hover hover:text-primary">
					Novedades de Entidades
				</li>
				<li class="select-none p-2 font-medium text-base cursor-pointer border-round-lg hover:surface-hover hover:text-primary">
					Consulta de Comprobantes
				</li>
				<li class="select-none p-2 font-medium text-base cursor-pointer border-round-lg hover:surface-hover hover:text-primary">
					Autorización de Comprobantes
				</li>
			</ul>
		</div>
		<div class="p-2">
			<article
				v-for="item in findings"
				:key="item.to"
				class="flex w-full justify-content-between align-items-center mb-3 select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
				@click="open(item)"
			>
				<div class="flex align-items-center">
					<span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
						<i :class="item.icon || 'pi pi-ticket'" class="text-lg"></i>
					</span>
					<div class="ml-2">
						<p class="font-semibold text-sm mt-0 mb-1">{{ item.name }}</p>
						<p class="font-normal text-xs text-600 mt-0 mb-0">Change your system preferences</p>
					</div>
				</div>
				<span class="hidden md:inline-block border-1 px-2 py-1 surface-border border-round surface-100 mr-2 text-600 text-xs">S</span>
			</article>
			<!-- <article
				class="flex w-full justify-content-between align-items-center mb-3 select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
			>
				<div class="flex align-items-center">
					<span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
						<i class="pi pi-cog text-lg"></i>
					</span>
					<div class="ml-2">
						<p class="font-semibold text-sm mt-0 mb-1">System Settings</p>
						<p class="font-normal text-xs text-600 mt-0 mb-0">Change your system preferences</p>
					</div>
				</div>
				<span class="hidden md:inline-block border-1 px-2 py-1 surface-border border-round surface-100 mr-2 text-600 text-xs">S</span>
			</article>

			<article
				class="flex w-full justify-content-between align-items-center mb-3 select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
			>
				<div class="flex align-items-center">
					<span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
						<i class="pi pi-user text-lg"></i>
					</span>
					<div class="ml-2">
						<p class="font-semibold text-sm mt-0 mb-1">My Profile</p>
						<p class="font-normal text-xs text-600 mt-0 mb-0">Go to your profile</p>
					</div>
				</div>
				<span class="hidden md:inline-block border-1 px-2 py-1 surface-border border-round surface-100 mr-2 text-600 text-xs">P</span>
			</article>

			<article
				class="flex w-full justify-content-between align-items-center mb-3 select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
			>
				<div class="flex align-items-center">
					<span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
						<i class="pi pi-moon text-lg"></i>
					</span>
					<div class="ml-2">
						<p class="font-semibold text-sm mt-0 mb-1">Switch to Dark Mode</p>
						<p class="font-normal text-xs text-600 mt-0 mb-0">Switch to dark mode save your eyes</p>
					</div>
				</div>
				<span class="hidden md:inline-block border-1 px-2 py-1 surface-border border-round surface-100 mr-2 text-600 text-xs">D</span>
			</article>

			<article
				class="flex w-full justify-content-between align-items-center select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
			>
				<div class="flex align-items-center">
					<span class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
						<i class="pi pi-sign-out text-lg"></i>
					</span>
					<div class="ml-2">
						<p class="font-semibold text-sm mt-0 mb-1">Log out</p>
						<p class="font-normal text-xs text-600 mt-0 mb-0">End your session</p>
					</div>
				</div>
			</article> -->
		</div>
	</Dialog>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useStateStore } from '@/store/state';
import { MenuItem } from '@/models/MenuItem';

export default {
	name: 'Search',
	data: () => ({
		searchValue: '',
		menu: [] as Array<MenuItem>,
		findings: [] as Array<MenuItem>,
	}),
	computed: {
		...mapStores(useStateStore),
	},
	watch: {
		searchValue(value: string): void {
			const recursiveSearch = (items: Array<MenuItem>) => {
				for (const item of items) {
					if (item.name?.toLowerCase().includes(value.toLowerCase()) && (item.to !== undefined || item.object !== undefined)) {
						this.findings.push(item);
					}
					if (this.findings.length >= 5) break;
					if (item.items && item.items.length > 0) {
						recursiveSearch(item.items);
					}
				}
			};

			if (value.length < 4) {
				this.findings = [];
				return;
			}

			this.findings = [];
			recursiveSearch(this.menu);
		},
	},
	methods: {
		onHide(): void {
			this.stateStore.showSearch(false);
			this.searchValue = '';
		},
		onShow(): void {
			this.menu = [];
		},
		open(): void {
			this.stateStore.showSearch(false);
		},
	},
};
</script>
