
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9hpyU96KZeX85FrFchzoiOcrdwVOXg_s",
  authDomain: "taskmanagementapp-2cdbb.firebaseapp.com",
  projectId: "taskmanagementapp-2cdbb",
  storageBucket: "taskmanagementapp-2cdbb.appspot.com",
  messagingSenderId: "103220406334",
  appId: "1:103220406334:web:4bc21f86f5a2f0c624c96f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);