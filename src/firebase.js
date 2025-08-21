
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBdI30_NzZE-hkUScVSRKJSlBJbZZyhAkU",
  authDomain: "invoice-app-c883d.firebaseapp.com",
  projectId: "invoice-app-c883d",
  storageBucket: "invoice-app-c883d.firebasestorage.app",
  messagingSenderId: "904217810666",
  appId: "1:904217810666:web:febbd5f22433555f20a993",
  measurementId: "G-6E9XE3F510",
};
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore(app);
