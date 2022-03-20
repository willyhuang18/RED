// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLeEfaVM8x1yM6dovbDGnpHCkZ8eGjFyk",
  authDomain: "red-1-project.firebaseapp.com",
  projectId: "red-1-project",
  storageBucket: "red-1-project.appspot.com",
  messagingSenderId: "500913736030",
  appId: "1:500913736030:web:6d377a96d5d6f48f3ba7cf"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };