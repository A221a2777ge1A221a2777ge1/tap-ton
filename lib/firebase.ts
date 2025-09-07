import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPxgbabl4DnDIXJ7LC1dOpBnRUvWUPFQs",
  authDomain: "tonup-t0iem.firebaseapp.com",
  projectId: "tonup-t0iem",
  storageBucket: "tonup-t0iem.firebasestorage.app",
  messagingSenderId: "681495947781",
  appId: "1:681495947781:web:b99f47aec8cbc228d74a6c"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
