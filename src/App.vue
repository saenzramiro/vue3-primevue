<template>
	<!-- Prime components used globally  -->
	<ConfirmPopup></ConfirmPopup>
	<Toast />
	<div class="flex-1 flex bg-surface-0 dark:bg-surface-950 gap-4">
		<div class="w-24 lg:block hidden m-4 p-6 bg-surface-100 dark:bg-surface-800 rounded-2xl">
			<div class="h-full w-full flex flex-col">
				<div class="flex-1 flex flex-col items-center overflow-auto">
					<svg
						class="fill-surface-900 dark:fill-surface-0"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_5691_32025)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M25.5557 11.6853C25.3082 11.5199 25.0541 11.3661 24.7943 11.2242C22.3709 9.90028 20 7.76142 20 5V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H5C7.76142 20 9.90028 22.3709 11.2242 24.7943C11.3661 25.0541 11.5199 25.3082 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M11 3.89813e-06C10.4477 4.13734e-06 10.0052 0.448821 9.95004 0.998347C9.85264 1.96909 9.61352 2.92218 9.2388 3.82683C8.73625 5.04009 7.99965 6.14248 7.07106 7.07107C6.14249 7.99966 5.04009 8.73625 3.82683 9.2388C2.92217 9.61352 1.96908 9.85264 0.998343 9.95004C0.448818 10.0052 4.1754e-07 10.4477 3.93399e-07 11L0 20C2.62644 20 5.22715 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 0L11 3.89813e-06Z"
							/>
						</g>
						<defs>
							<clipPath id="clip0_5691_32025">
								<rect width="40" height="40" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<div class="w-full h-[1px] bg-surface-200 dark:bg-surface-700 my-6" />
					<nav class="flex flex-col items-center gap-4">
						<template v-for="(item, index) of navs" :key="index">
							<Button
								:class="
									selectedNav === item.label
										? 'bg-surface-0 dark:bg-surface-950 text-surface-900 dark:text-surface-0 border-surface'
										: 'bg-transparent border-transparent text-surface-600 dark:text-surface-500'
								"
								class="w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-surface-0 dark:hover:bg-surface-950 hover:text-surface-900 dark:hover:text-surface-0 hover:border-surface transition-all"
								@click="selectedNav = item.label"
							>
								<i :class="item.icon" class="text-lg leading-none" />
							</Button>
						</template>
					</nav>
				</div>
				<div class="flex flex-col items-center">
					<div class="flex flex-col items-center gap-2">
						<template v-for="(item, index) of bottomNavs" :key="index">
							<Button
								:class="
									selectedNav === item.label
										? 'bg-surface-0 dark:bg-surface-950 text-surface-900 dark:text-surface-0 border-surface'
										: 'bg-transparent border-transparent text-surface-600 dark:text-surface-500'
								"
								class="w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-surface-0 dark:hover:bg-surface-950 hover:text-surface-900 dark:hover:text-surface-0 hover:border-surface transition-all"
								@click="selectedNav = item.label"
							>
								<i :class="item.icon" class="text-lg leading-none" />
							</Button>
						</template>
					</div>
					<div class="w-full h-[1px] bg-surface-200 dark:bg-surface-700 my-6" />
					<Avatar
						image="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-18.jpg"
						class="!w-10 !h-10 cursor-pointer"
						shape="circle"
					/>
				</div>
			</div>
		</div>
		<div class="min-h-screen overflow-auto flex-1 flex flex-col pr-3 pb-3 gap-8 transition-all">
			<div class="flex flex-wrap py-6 items-start justify-between gap-2">
				<div class="flex-1 flex items-center gap-2">
					<a
						v-styleclass="{
							selector: '#app-sidebar-floating-slim',
							enterFromClass: 'hidden',
							enterActiveClass: 'animate-fadeinleft',
							leaveToClass: 'hidden',
							leaveActiveClass: 'animate-fadeoutleft',
						}"
						class="cursor-pointer lg:hidden"
						><i class="pi pi-bars text-xl mr-4"
					/></a>
					<div class="flex-1 whitespace-nowrap">
						<h1 class="text-lg font-medium text-surface-900 dark:text-surface-0">Dashboard</h1>
						<p class="text-surface-500">Excepteur sint occaecat</p>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<IconField>
						<InputIcon class="pi pi-search" />
						<InputText v-model="searchValue" placeholder="Search" />
					</IconField>
					<Button icon="pi pi-bell" severity="secondary" outlined />
				</div>
			</div>
			<div class="min-h-96 w-full border-2 border-surface border-dashed rounded-lg" />
			<div class="min-h-96 w-full border-2 border-surface border-dashed rounded-lg" />
		</div>
	</div>
	<Search />
	<Settings />
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useStateStore } from '@/store/state';
import { useUserStore } from '@/store/user';
import Menu from 'primevue/menu';
import OverlayPanel from 'primevue/overlaypanel';

export default {
	name: 'App',
	components: {},
	data() {
		return {
			showProfileMenu: false,
			showSearchDialog: false,
			searchValue: '',
			selectedNav: 'Home',
			notifications: [
				{
					id: 1,
					label: 'Amy Elsner',
				},
			],
			navs: [
				{ label: 'Home', icon: 'pi pi-home' },
				{ label: 'Bookmark', icon: 'pi pi-bookmark' },
				{ label: 'Users', icon: 'pi pi-users' },
				{ label: 'Comments', icon: 'pi pi-comments' },
				{ label: 'Calendar', icon: 'pi pi-calendar' },
			],
		};
	},
	computed: {
		...mapStores(useStateStore, useUserStore),
	},
	methods: {
		navigateTo(to: string) {
			this.$router.push(to);
		},
		toggle(ref: string, e: MouseEvent) {
			const overlayPanel = this.$refs[ref] as InstanceType<typeof OverlayPanel | typeof Menu>;
			overlayPanel.toggle(e);
		},
		pinMenu(e: MouseEvent, item: any) {
			const target = e.target as HTMLElement;
			target.classList.replace('pi-thumbtack', 'pi-spinner');
			target.classList.add('pi-spin');
			setTimeout(() => {
				target.classList.replace('pi-spinner', 'pi-thumbtack');
				target.classList.remove('pi-spin');
				this.$toast.add({ severity: 'success', summary: item.pinned ? 'Módulo desfijado' : 'Módulo fijado', life: 3000 });
			}, 2000);
		},
		async logout(e: MouseEvent) {
			console.log('Logging out...', e);

			this.$confirm.require({
				target: e.target as HTMLElement,
				message: '¿Estás seguro que querés salir?',
				icon: 'pi pi-info-circle',
				rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
				acceptClass: 'p-button-danger p-button-sm',
				rejectLabel: 'Cancelar',
				acceptLabel: 'Salir',
				accept: async () => {
					await this.userStore.signOut();
					this.navigateTo('/auth/login');
				},
				reject: () => {},
			});
		},
	},
};
</script>
<style lang="scss"></style>
