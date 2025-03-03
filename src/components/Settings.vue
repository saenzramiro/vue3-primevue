<template>
	<Drawer
		v-model:visible="stateStore.settingsDrawer"
		header="Configuración de Perfil"
		append-to="body"
		position="right"
		class="w-full md:w-20rem lg:w-30rem"
		@hide="onHide"
	>
		<div class="flex align-items-center mb-5">
			<label for="darkmode" class="mr-2 text-sm">Dark mode</label>
			<ToggleSwitch v-model="darkMode" input-id="darkmode" />
		</div>
		<div class="grid formgrid p-fluid">
			<div class="field mb-4 col-12">
				<label for="nickname" class="font-medium text-900"> Nickname </label>
				<InputText id="nickname" type="text" />
			</div>
			<div class="field mb-4 col-12">
				<label for="avatar" class="font-medium text-900"> Avatar </label>
				<FileUpload
					mode="basic"
					name="avatar"
					custom-upload
					accept="image/*"
					:max-file-size="1000000"
					choose-label="Upload Image"
					class="p-button-outlined p-button-plain"
				></FileUpload>
			</div>
			<div class="field mb-4 col-12">
				<label for="bio" class="font-medium text-900"> Bio </label>
				<Textarea id="bio" type="text" :rows="5" auto-resize></Textarea>
			</div>
			<div class="field mb-4 col-12 md:col-6">
				<label for="email" class="font-medium text-900"> Email </label>
				<InputText id="email" type="text" />
			</div>
			<div class="field mb-4 col-12 md:col-6">
				<label for="country" class="font-medium text-900"> Country </label>
				<Select
					v-model="selectedCountry"
					:options="countries"
					option-label="name"
					:filter="true"
					placeholder="Select a Country"
					:show-clear="true"
				>
					<template #value="slotProps">
						<div v-if="slotProps.value" class="flex align-items-center">
							<span :class="`mr-2 flag flag-${selectedCountry?.code?.toLowerCase()}`" style="width: 18px; height: 12px" />
							<div>{{ slotProps.value.name }}</div>
						</div>
						<span v-else>
							{{ slotProps.placeholder }}
						</span>
					</template>
					<template #option="slotProps">
						<div class="flex align-items-center">
							<span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px" />
							<div>{{ slotProps.option.name }}</div>
						</div>
					</template>
				</Select>
			</div>
			<div class="field mb-4 col-12 md:col-6">
				<label for="city" class="font-medium text-900"> City </label>
				<InputText id="city" type="text" />
			</div>
			<div class="field mb-4 col-12 md:col-6">
				<label for="state" class="font-medium text-900"> State </label>
				<InputText id="state" type="text" />
			</div>
			<div class="field mb-4 col-12">
				<label for="website" class="font-medium text-900"> Website </label>
				<InputGroup>
					<InputGroupAddon> www </InputGroupAddon>
					<InputText id="website" type="text" />
				</InputGroup>
			</div>
			<div class="col-12">
				<Button label="Create User" class="w-auto mt-3"></Button>
			</div>
		</div>
	</Drawer>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useStateStore } from '@/store/state';

export default {
	name: 'Settings',
	data: () => ({
		darkMode: false,
		countries: [
			{ name: 'Australia', code: 'AU' },
			{ name: 'Brazil', code: 'BR' },
			{ name: 'China', code: 'CN' },
			{ name: 'Egypt', code: 'EG' },
			{ name: 'France', code: 'FR' },
			{ name: 'Germany', code: 'DE' },
			{ name: 'India', code: 'IN' },
			{ name: 'Japan', code: 'JP' },
			{ name: 'Spain', code: 'ES' },
			{ name: 'United States', code: 'US' },
		],
		selectedCountry: { code: null as string | null },
	}),
	computed: {
		...mapStores(useStateStore),
	},
	watch: {},
	methods: {
		onHide(): void {
			this.stateStore.showSettings(false);
		},
	},
};
</script>
