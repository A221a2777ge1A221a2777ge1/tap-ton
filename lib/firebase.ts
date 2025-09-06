import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk0pnzvSZM0iHZwCfvWaGgNnB0yfLiE1o",
  authDomain: "cryptorich2050.firebaseapp.com",
  projectId: "cryptorich2050",
  storageBucket: "cryptorich2050.firebasestorage.app",
  messagingSenderId: "1062507734088",
  appId: "1:1062507734088:web:dd1b20203db70b4e9fe47d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
