import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
	state: () => ({
		searchDialog: false,
		settingsDrawer: false,
	}),
	getters: {},
	actions: {
		showSearch(value: boolean) {
			this.searchDialog = value;
		},
		showSettings(value: boolean) {
			this.settingsDrawer = value;
		},
	},
});
