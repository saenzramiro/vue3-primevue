<template>
	<div class="mb-4">
		<div class="text-900 text-xl font-bold mb-2">Registrarse</div>
		<span class="text-600 font-medium">¡Empecemos!</span>
	</div>
	<div class="flex flex-column w-full md:w-auto">
		<InlineMessage v-if="error" severity="error" class="mb-4">{{ error }}</InlineMessage>
		<IconField icon-position="left" class="w-full mb-4">
			<InputIcon class="pi pi-envelope" />
			<InputText id="email" v-model="email" :invalid="emailInvalid" type="text" class="w-full md:w-25rem" placeholder="Email" />
		</IconField>
		<IconField icon-position="left" class="w-full mb-4">
			<InputIcon class="pi pi-lock z-2" />
			<Password
				id="password"
				v-model="password"
				placeholder="Contraseña"
				class="w-full"
				:input-style="{ paddingLeft: '2rem' }"
				input-class="w-full md:w-25rem"
				toggle-mask
			></Password>
		</IconField>
		<Button label="Registrarse" class="w-full mb-4" :loading="loading" @click="register"></Button>
		<span class="font-medium text-600">
			¿Ya tenés una cuenta?
			<router-link
				class="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300 no-underline"
				to="/auth/login"
				>Ingresar
			</router-link>
		</span>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useUserStore } from '@/store/user';

export default {
	name: 'Register',
	data() {
		return {
			email: '',
			password: '',
			error: null as null | string,
			loading: false,
			emailInvalid: false,
		};
	},
	computed: {
		...mapStores(useUserStore),
	},
	methods: {
		validateEmail(value: string) {
			if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				this.error = null;
			} else {
				this.emailInvalid = true;
				throw new Error('Ingresá un email válido por favor');
			}
		},
		async register() {
			try {
				this.loading = true;
				this.validateEmail(this.email);
				await this.userStore.signUp(this.email, this.password);
				this.$router.push({ path: '/' });
			} catch (error: any) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
