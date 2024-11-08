/* eslint-disable no-case-declarations */
import { defineStore } from 'pinia';
import {
	getAuth,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	ProviderId,
	User,
} from 'firebase/auth';
import { getCurrentUser } from 'vuefire';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

import router from '@/router';

// TODO: Move to a error enums file
const firebaseErrors = {
	'auth/admin-restricted-operation': 'Operación solo para administradores',
	'auth/argument-error': 'Error de argumento',
	'auth/app-not-authorized': 'Aplicación no autorizada',
	'auth/app-not-installed': 'Aplicación no instalada',
	'auth/captcha-check-failed': 'Falló la verificación de Captcha',
	'auth/code-expired': 'Código expirado',
	'auth/cordova-not-ready': 'Cordova no está listo',
	'auth/cors-unsupported': 'CORS no soportado',
	'auth/credential-already-in-use': 'Credencial ya en uso',
	'auth/custom-token-mismatch': 'Incompatibilidad de credenciales',
	'auth/requires-recent-login': 'Credencial demasiado antigua, inicie sesión de nuevo',
	'auth/dependent-sdk-initialized-before-auth': 'SDK dependiente inicializado antes de la autenticación',
	'auth/dynamic-link-not-activated': 'Enlace dinámico no activado',
	'auth/email-change-needs-verification': 'El cambio de correo electrónico necesita verificación',
	'auth/email-already-in-use': 'Correo electrónico ya en uso',
	'auth/emulator-config-failed': 'Falló la configuración del emulador',
	'auth/expired-action-code': 'Código de acción expirado',
	'auth/cancelled-popup-request': 'Solicitud de ventana emergente expirada',
	'auth/internal-error': 'Error interno',
	'auth/invalid-api-key': 'Clave API inválida',
	'auth/invalid-app-credential': 'Credencial de aplicación inválida',
	'auth/invalid-app-id': 'ID de aplicación inválido',
	'auth/invalid-user-token': 'Autenticación inválida',
	'auth/invalid-auth-event': 'Evento de autenticación inválido',
	'auth/invalid-cert-hash': 'Hash de certificado inválido',
	'auth/invalid-verification-code': 'Código inválido',
	'auth/invalid-continue-uri': 'URI de continuación inválido',
	'auth/invalid-cordova-configuration': 'Configuración de Cordova inválida',
	'auth/invalid-custom-token': 'Token personalizado inválido',
	'auth/invalid-dynamic-link-domain': 'Dominio de enlace dinámico inválido',
	'auth/invalid-email': 'Correo electrónico inválido',
	'auth/invalid-emulator-scheme': 'Esquema de emulador inválido',
	'auth/invalid-credential': 'Respuesta de IDP inválida',
	'auth/invalid-message-payload': 'Carga de mensaje inválida',
	'auth/invalid-multi-factor-session': 'Sesión MFA inválida',
	'auth/invalid-oauth-client-id': 'ID de cliente OAuth inválido',
	'auth/invalid-oauth-provider': 'Proveedor OAuth inválido',
	'auth/invalid-action-code': 'Código OOB inválido',
	'auth/unauthorized-domain': 'Origen inválido',
	'auth/wrong-password': 'Contraseña inválida',
	'auth/invalid-persistence-type': 'Persistencia inválida',
	'auth/invalid-phone-number': 'Número de teléfono inválido',
	'auth/invalid-provider-id': 'ID de proveedor inválido',
	'auth/invalid-recipient-email': 'Correo electrónico del destinatario inválido',
	'auth/invalid-sender': 'Remitente inválido',
	'auth/invalid-verification-id': 'Información de sesión inválida',
	'auth/invalid-tenant-id': 'ID de inquilino inválido',
	'auth/multi-factor-info-not-found': 'Información MFA no encontrada',
	'auth/multi-factor-auth-required': 'Se requiere MFA',
	'auth/missing-android-pkg-name': 'Falta el nombre del paquete Android',
	'auth/missing-app-credential': 'Falta la credencial de la aplicación',
	'auth/auth-domain-config-required': 'Falta el dominio de autenticación',
	'auth/missing-verification-code': 'Falta el código',
	'auth/missing-continue-uri': 'Falta la URI de continuación',
	'auth/missing-iframe-start': 'Falta el inicio del iframe',
	'auth/missing-ios-bundle-id': 'Falta el ID del paquete iOS',
	'auth/missing-or-invalid-nonce': 'Nonce faltante o inválido',
	'auth/missing-multi-factor-info': 'Falta la información MFA',
	'auth/missing-multi-factor-session': 'Falta la sesión MFA',
	'auth/missing-phone-number': 'Falta el número de teléfono',
	'auth/missing-verification-id': 'Falta la información de la sesión',
	'auth/app-deleted': 'Módulo destruido',
	'auth/account-exists-with-different-credential': 'Necesita confirmación',
	'auth/network-request-failed': 'Falló la solicitud de red',
	'auth/null-user': 'Usuario nulo',
	'auth/no-auth-event': 'No hay evento de autenticación',
	'auth/no-such-provider': 'No existe tal proveedor',
	'auth/operation-not-allowed': 'Operación no permitida',
	'auth/operation-not-supported-in-this-environment': 'Operación no soportada',
	'auth/popup-blocked': 'Ventana emergente bloqueada',
	'auth/popup-closed-by-user': 'Ventana emergente cerrada por el usuario',
	'auth/provider-already-linked': 'Proveedor ya vinculado',
	'auth/quota-exceeded': 'Cuota excedida',
	'auth/redirect-cancelled-by-user': 'Redirección cancelada por el usuario',
	'auth/redirect-operation-pending': 'Operación de redirección pendiente',
	'auth/rejected-credential': 'Credencial rechazada',
	'auth/second-factor-already-in-use': 'Segundo factor ya inscrito',
	'auth/maximum-second-factor-count-exceeded': 'Límite de segundo factor excedido',
	'auth/tenant-id-mismatch': 'Incompatibilidad de ID de inquilino',
	'auth/timeout': 'Tiempo agotado',
	'auth/user-token-expired': 'Token expirado',
	'auth/too-many-requests': 'Demasiados intentos, intente más tarde',
	'auth/unauthorized-continue-uri': 'Dominio no autorizado',
	'auth/unsupported-first-factor': 'Primer factor no soportado',
	'auth/unsupported-persistence-type': 'Tipo de persistencia no soportado',
	'auth/unsupported-tenant-operation': 'Operación de inquilino no soportada',
	'auth/unverified-email': 'Correo electrónico no verificado',
	'auth/user-cancelled': 'Usuario cancelado',
	'auth/user-not-found': 'Usuario no encontrado',
	'auth/user-disabled': 'Usuario deshabilitado',
	'auth/user-mismatch': 'Incompatibilidad de usuario',
	'auth/user-signed-out': 'Usuario desconectado',
	'auth/weak-password': 'Contraseña débil',
	'auth/web-storage-unsupported': 'Almacenamiento web no soportado',
	'auth/already-initialized': 'Ya inicializado',
	'auth/recaptcha-not-enabled': 'Recaptcha no habilitado',
	'auth/missing-recaptcha-token': 'Falta el token de Recaptcha',
	'auth/invalid-recaptcha-token': 'Token de Recaptcha inválido',
	'auth/invalid-recaptcha-action': 'Acción de Recaptcha inválida',
	'auth/missing-client-type': 'Falta el tipo de cliente',
	'auth/missing-recaptcha-version': 'Falta la versión de Recaptcha',
	'auth/invalid-recaptcha-version': 'Versión de Recaptcha inválida',
	'auth/invalid-req-type': 'Tipo de solicitud inválido',
};

// const auth = useFirebaseAuth();

export const useUserStore = defineStore('user', {
	state: () => ({
		// loggedIn: false,
		data: null as User | null | undefined,
	}),
	getters: {
		user: state => state.data,
	},
	actions: {
		async signUp(email: string, password: string) {
			try {
				const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
				this.currentUser(); // To save the user in the store
				console.info('🙎🏻 User registered:', user);
			} catch (error: any) {
				const errorCode = error.code as keyof typeof firebaseErrors;
				throw new Error(firebaseErrors[errorCode] || error.code);
			}
		},

		async signIn(provider: (typeof ProviderId)[keyof typeof ProviderId], email?: string, password?: string) {
			try {
				let user: User, result;
				switch (provider) {
					case ProviderId.PASSWORD:
						result = await signInWithEmailAndPassword(getAuth(), email!, password!);
						user = result.user;
						break;
					case ProviderId.GOOGLE:
						const p = new GoogleAuthProvider();
						p.addScope('profile');
						p.addScope('email');
						result = await signInWithPopup(getAuth(), p);
						const credential = GoogleAuthProvider.credentialFromResult(result);
						console.log(result, credential);

						// const token = credential.accessToken;
						user = result.user;
						break;
					default:
						break;
				}
				this.currentUser(); // To save the user in the store
				console.info('🙎🏻 User signed in:', user!);
				router.push({ path: '/' });
			} catch (error: any) {
				const errorCode = error.code as keyof typeof firebaseErrors;
				throw new Error(firebaseErrors[errorCode] || error.code);
			}
		},
		async signOut() {
			await signOut(getAuth());
		},
		async resetPassword(email: string) {
			try {
				await httpsCallable(
					functions,
					'user-resetPassword'
				)({
					email,
				});
			} catch (error: any) {
				const errorCode = error.code as keyof typeof firebaseErrors;
				throw new Error(firebaseErrors[errorCode] || error.code);
			}
		},
		async currentUser() {
			this.data = await getCurrentUser();
			return this.data;
		},
	},
});
