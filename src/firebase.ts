import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseApp = initializeApp({
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	databaseURL: import.meta.env.VITE_DATABASEURL,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	appId: import.meta.env.VITE_APPID,
});
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const functions = getFunctions(firebaseApp);

if (import.meta.env.DEV) {
	connectFirestoreEmulator(db, 'localhost', 5002);
	connectAuthEmulator(auth, import.meta.env.VITE_AUTHDOMAIN, { disableWarnings: true });
	connectFunctionsEmulator(functions, import.meta.env.VITE_FUNCTIONSURL.split(':')[0], import.meta.env.VITE_FUNCTIONSURL.split(':')[1]);
}

export { firebaseApp, auth, db, storage, analytics, functions };
