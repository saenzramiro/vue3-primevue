<template>
	<div class="mb-4 w-full text-left">
		<img src="@/assets/images/logo.svg" class="h-5rem mb-3" />
		<div class="text-900 text-xl font-bold mb-2">Bienvenido a EternumPRO</div>
		<span class="text-600 font-medium">Por favor, ingresa tus credenciales</span>
	</div>
	<div class="flex flex-column w-full md:w-auto">
		<InlineMessage v-if="error" severity="error" class="mb-4">{{ error }}</InlineMessage>
		<IconField icon-position="left" class="w-full mb-4">
			<InputIcon class="pi pi-envelope" />
			<InputText id="email" v-model="email" type="text" class="w-full md:w-25rem" placeholder="Email" />
		</IconField>

		<IconField icon-position="left" class="w-full mb-4">
			<InputIcon class="pi pi-lock" />
			<InputText id="password" v-model="password" type="password" class="w-full md:w-25rem" placeholder="Contraseña" />
		</IconField>
		<div class="mb-4 flex flex-wrap gap-3">
			<router-link
				to="/auth/forgotpassword"
				class="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300 no-underline"
				>¿Olvidaste tu contraseña?
			</router-link>
			<!-- <router-link
				to="/auth/register"
				class="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300 no-underline"
				>Registrarse
			</router-link> -->
		</div>
		<Button label="Ingresar" class="w-full" :loading="loading" @click="usernamePassword"></Button>
		<Divider>o</Divider>
		<ButtonGroup class="flex">
			<Button label="Google" severity="secondary" icon="pi pi-google" class="flex-1" @click="googleLogin" />
			<Button label="Facebook" severity="secondary" icon="pi pi-facebook" class="flex-1" />
			<Button label="Twitter" severity="secondary" icon="pi pi-twitter" class="flex-1" />
		</ButtonGroup>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { ProviderId } from 'firebase/auth';
import { useUserStore } from '@/store/user';
import ButtonGroup from 'primevue/buttongroup';

export default {
	name: 'Login',
	components: {
		ButtonGroup,
	},
	data() {
		return {
			email: '',
			password: '',
			error: null,
			loading: false,
		};
	},
	computed: {
		...mapStores(useUserStore),
	},
	mounted() {},
	methods: {
		async usernamePassword() {
			try {
				this.loading = true;
				await this.userStore.signIn(ProviderId.PASSWORD, this.email, this.password);
			} catch (error: any) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
		async googleLogin() {
			try {
				this.loading = true;
				await this.userStore.signIn(ProviderId.GOOGLE);
			} catch (error: any) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
