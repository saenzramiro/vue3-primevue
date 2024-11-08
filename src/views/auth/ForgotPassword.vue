<template>
	<div class="mb-4">
		<div class="text-900 text-xl font-bold mb-2">Restablecé tu contraseña</div>
		<span class="text-600 font-medium"
			>Ingresá tu email y te enviaremos un correo electrónico<br />con instrucciones para restablecer tu contraseña.</span
		>
	</div>
	<div class="flex flex-column w-full md:w-auto">
		<InlineMessage v-if="error" severity="error" class="mb-4">{{ error }}</InlineMessage>
		<IconField icon-position="left" class="w-full mb-4">
			<InputIcon class="pi pi-envelope" />
			<InputText id="email" v-model="email" :invalid="emailInvalid" type="text" class="w-full" placeholder="Email" />
		</IconField>
		<div class="flex flex-wrap gap-2 justify-content-between">
			<Button label="Cancelar" class="flex-auto" outlined @click="navigateTo('/auth/login')"></Button>
			<Button label="Enviar instrucciones" class="flex-auto" :loading="loading" @click="forgot"></Button>
		</div>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useUserStore } from '@/store/user';

export default {
	name: 'ForgotPassword',
	data() {
		return {
			email: '',
			error: null as null | string,
			loading: false,
			emailInvalid: false,
		};
	},
	computed: {
		...mapStores(useUserStore),
	},
	methods: {
		navigateTo(path: string) {
			this.$router.push({ path });
		},
		validateEmail(value: string) {
			if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				this.error = null;
			} else {
				this.emailInvalid = true;
				throw new Error('Ingresá un email válido por favor');
			}
		},
		async forgot() {
			try {
				this.loading = true;
				this.validateEmail(this.email);
				await this.userStore.resetPassword(this.email);
				this.$toast.add({
					severity: 'success',
					summary: 'Listo',
					detail: 'Te enviamos un correo con instrucciones para restablecer tu contraseña.',
					life: 3000,
				});
				this.navigateTo('/auth/login');
			} catch (error: any) {
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
